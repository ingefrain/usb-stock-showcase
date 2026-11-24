import { useSyncExternalStore } from "react";
import { MIN_ORDER } from "./catalog";

export type QuoteItem = { id: string; qty: number };

/** Every variant must be quoted at MIN_ORDER pieces or more. */
export function normalizeQty(n: number) {
  if (!Number.isFinite(n)) return MIN_ORDER;
  return Math.max(MIN_ORDER, Math.round(n));
}

let items: QuoteItem[] = [];
const listeners = new Set<() => void>();
const KEY = "usbstock-quote";
let loaded = false;

function emit() {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(items));
  listeners.forEach((l) => l());
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]") as QuoteItem[];
    items = raw.map((i) => ({ id: i.id, qty: normalizeQty(i.qty) }));
  } catch {
    items = [];
  }
}

export const quote = {
  get: () => items,
  add(id: string, qty = MIN_ORDER) {
    const q = normalizeQty(qty);
    const ex = items.find((i) => i.id === id);
    items = ex ? items.map((i) => (i.id === id ? { ...i, qty: normalizeQty(i.qty + q) } : i)) : [...items, { id, qty: q }];
    emit();
  },
  setQty(id: string, qty: number) {
    items = items.map((i) => (i.id === id ? { ...i, qty: normalizeQty(qty) } : i));
    emit();
  },
  remove(id: string) {
    items = items.filter((i) => i.id !== id);
    emit();
  },
  clear() {
    items = [];
    emit();
  },
  subscribe(l: () => void) {
    listeners.add(l);
    if (!loaded) {
      load();
      queueMicrotask(l);
    }
    return () => listeners.delete(l);
  },
};

const empty: QuoteItem[] = [];
export function useQuote() {
  return useSyncExternalStore(quote.subscribe, quote.get, () => empty);
}

// Open/close state for the quote drawer
let open = false;
const openL = new Set<() => void>();
export const quoteDrawer = {
  set(v: boolean) { open = v; openL.forEach((l) => l()); },
  sub(l: () => void) { openL.add(l); return () => openL.delete(l); },
};
export function useQuoteDrawer() {
  return useSyncExternalStore(quoteDrawer.sub, () => open, () => false);
}
