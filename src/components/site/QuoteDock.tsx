import { ClipboardList, Minus, Plus, Trash2, X, ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { findProduct, MIN_ORDER } from "@/lib/catalog";
import { quote, quoteDrawer, useQuote, useQuoteDrawer } from "@/lib/quote";

export function QuoteDock() {
  const items = useQuote();
  const open = useQuoteDrawer();
  const [sent, setSent] = useState(false);
  const [bump, setBump] = useState(false);
  const total = items.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    if (!items.length) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [items.length]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && quoteDrawer.set(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  return (
    <>
      {/* Floating tab — sits left of the WhatsApp button, never on top of it */}
      <button
        onClick={() => quoteDrawer.set(true)}
        aria-label={`Revisar cotización, ${items.length} productos`}
        className={`fixed bottom-5 left-4 right-[5.25rem] z-40 flex h-14 items-center gap-3 rounded-full bg-ink pl-2 pr-5 text-ink-foreground shadow-lift transition-[opacity,transform] duration-500 ease-out sm:left-auto sm:right-24 sm:w-auto ${items.length ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"}`}
      >
        <span className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary transition-transform duration-300 ${bump ? "scale-110" : ""}`}>
          <ClipboardList className="h-[18px] w-[18px]" />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-background px-1 text-[11px] font-bold text-foreground">{items.length}</span>
        </span>
        <span className="min-w-0 text-left">
          <span className="block truncate text-sm font-bold">Revisar cotización</span>
          <span className="block truncate text-[11px] text-ink-foreground/60">{total.toLocaleString("es-MX")} piezas</span>
        </span>
      </button>

      {/* Drawer */}
      <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div onClick={() => quoteDrawer.set(false)} className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
        <aside role="dialog" aria-label="Tu cotización" className={`absolute bottom-0 right-0 flex max-h-[88dvh] w-full flex-col rounded-t-[2rem] bg-background shadow-lift transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:top-0 sm:max-h-none sm:max-w-md sm:rounded-none sm:rounded-l-[2rem] ${open ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-x-full sm:translate-y-0"}`}>
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Solicitud</p>
              <h2 className="text-xl font-bold">Tu cotización</h2>
            </div>
            <button onClick={() => quoteDrawer.set(false)} aria-label="Cerrar" className="grid h-10 w-10 place-items-center rounded-full bg-muted"><X className="h-4 w-4" /></button>
          </div>
          {sent ? (
            <div className="grid flex-1 place-items-center p-10 text-center">
              <div>
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success"><Check className="h-6 w-6" /></span>
                <p className="mt-4 text-lg font-bold">Solicitud lista</p>
                <p className="mt-1 text-sm text-muted-foreground">En el sitio real, un asesor recibiría esta solicitud. (Demostración)</p>
                <button onClick={() => { setSent(false); quoteDrawer.set(false); }} className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-ink-foreground">Seguir navegando</button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="grid flex-1 place-items-center p-10 text-center text-sm text-muted-foreground">Aún no agregas productos.</div>
          ) : (
            <>
              <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
                {items.map((i) => {
                  const p = findProduct(i.id);
                  if (!p) return null;
                  return (
                    <li key={i.id} className="flex gap-4 py-4">
                      <img src={p.image} alt="" className="h-20 w-20 shrink-0 rounded-2xl bg-muted object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold">{p.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{p.model}{p.capacity ? ` · ${p.capacity}` : ""}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-border">
                            <button aria-label="Restar 10" disabled={i.qty <= MIN_ORDER} onClick={() => quote.setQty(i.id, i.qty - 10)} className="grid h-9 w-9 place-items-center disabled:opacity-30"><Minus className="h-3.5 w-3.5" /></button>
                            <input
                              aria-label="Cantidad"
                              type="number"
                              min={MIN_ORDER}
                              step={10}
                              defaultValue={i.qty}
                              key={i.qty}
                              onBlur={(e) => quote.setQty(i.id, Number(e.target.value))}
                              className="w-14 bg-transparent text-center text-sm font-bold [appearance:textfield] focus:outline-none"
                            />
                            <button aria-label="Sumar 10" onClick={() => quote.setQty(i.id, i.qty + 10)} className="grid h-9 w-9 place-items-center"><Plus className="h-3.5 w-3.5" /></button>
                          </div>
                          <button onClick={() => quote.remove(i.id)} aria-label="Quitar" className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-border p-6">
                <p className="mb-4 text-xs text-muted-foreground">Mínimo {MIN_ORDER} piezas por variante. Los precios se envían en la cotización.</p>
                <button onClick={() => { setSent(true); quote.clear(); }} className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 font-semibold text-primary-foreground shadow-red">
                  Solicitar cotización <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
