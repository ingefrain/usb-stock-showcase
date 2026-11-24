import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Search, X, RotateCw, Check, Plus } from "lucide-react";
import { availability, categories, fetchPage, MIN_ORDER, type Product } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { useScrollReveals } from "@/lib/motion";
import { quote } from "@/lib/quote";
import { toast } from "sonner";

type Search = { cat?: string; q?: string };

export const Route = createFileRoute("/catalogo")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const out: Search = {};
    if (typeof s["cat"] === "string" && s["cat"]) out.cat = s["cat"];
    if (typeof s["q"] === "string" && s["q"]) out.q = s["q"];
    return out;
  },
  head: () => ({
    meta: [
      { title: "Catálogo de memorias USB personalizadas — USB Stock" },
      { name: "description", content: "Explora memorias USB giratorias, metálicas, tarjeta, madera, ecológicas, ejecutivas y llavero para tu marca." },
      { property: "og:title", content: "Catálogo — USB Stock" },
      { property: "og:description", content: "Memorias USB promocionales en todos los estilos, desde 50 piezas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalog,
});

const PAGE = 24;
const usbSubs = categories[0]!.subs;

function labelFor(cat?: string) {
  if (!cat) return null;
  for (const c of categories) {
    if (c.slug === cat) return c.name;
    const s = c.subs.find((x) => x.slug === cat);
    if (s) return c.slug === "memorias-usb" ? `USB ${s.name.toLowerCase()}` : s.name;
  }
  return cat;
}

function Catalog() {
  const { cat, q } = Route.useSearch();
  const navigate = useNavigate({ from: "/catalogo" });
  const [items, setItems] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("loading");
  const [term, setTerm] = useState(q ?? "");
  const [view, setView] = useState<Product | null>(null);
  const sentinel = useRef<HTMLDivElement>(null);
  const scope = useRef<HTMLDivElement>(null);
  const reqId = useRef(0);
  const isUsb = !cat || cat === "memorias-usb" || usbSubs.some((s) => s.slug === cat);

  useScrollReveals(scope, [items.length]);

  const load = useCallback((offset: number) => {
    const id = ++reqId.current;
    setStatus("loading");
    fetchPage({ ...(cat ? { cat } : {}), ...(q ? { q } : {}) }, offset, PAGE)
      .then((r) => {
        if (id !== reqId.current) return;
        setItems((prev) => (offset === 0 ? r.items : [...prev, ...r.items]));
        setTotal(r.total);
        setStatus(offset + r.items.length >= r.total ? "done" : "idle");
      })
      .catch(() => id === reqId.current && setStatus("error"));
  }, [cat, q]);

  // reset on filter change
  useEffect(() => {
    setItems([]);
    if (isUsb) load(0);
    else setStatus("done");
  }, [cat, q, isUsb, load]);

  // debounce search into URL
  useEffect(() => {
    const t = setTimeout(() => {
      if ((q ?? "") !== term) navigate({ search: (prev) => { const n: Search = { ...prev }; if (term) n.q = term; else delete n.q; return n; }, replace: true });
    }, 300);
    return () => clearTimeout(t);
  }, [term, q, navigate]);

  // infinite scroll
  useEffect(() => {
    const el = sentinel.current;
    if (!el || status !== "idle") return;
    const io = new IntersectionObserver((e) => e[0]?.isIntersecting && load(items.length), { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [status, items.length, load]);

  const chip = (slug: string | undefined, name: string) => {
    const active = (cat ?? undefined) === slug;
    return (
      <Link key={name} to="/catalogo" search={(prev) => { const n: Search = { ...prev }; if (slug) n.cat = slug; else delete n.cat; return n; }} className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${active ? "bg-ink text-ink-foreground" : "bg-background text-foreground/70 hover:text-foreground"}`}>
        {name}
      </Link>
    );
  };

  return (
    <div ref={scope} className="bg-muted pb-28">
      <section className="relative overflow-hidden bg-hero pb-10 pt-28 md:pb-14 md:pt-36">
        <div className="tech-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_80%_at_80%_20%,black,transparent)]" />
        <div className="container-x relative">
          <p data-reveal className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Catálogo{labelFor(cat) ? ` · ${labelFor(cat)}` : ""}</p>
          <h1 data-reveal className="mt-3 max-w-3xl text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
            {labelFor(cat) ?? "Memorias USB para tu marca."}
          </h1>
          <p data-reveal className="mt-5 max-w-lg text-muted-foreground">Todos los modelos se personalizan con tu logotipo. Pedido mínimo de {MIN_ORDER} piezas por variante.</p>
          <div data-reveal className="relative mt-8 max-w-2xl">
            <Search className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Busca por nombre, modelo o capacidad…"
              aria-label="Buscar productos"
              className="h-16 w-full rounded-full border border-border bg-background pl-14 pr-14 text-base shadow-soft outline-none transition-[border-color,box-shadow] focus:border-primary/50 focus:shadow-lift"
            />
            {term && <button onClick={() => setTerm("")} aria-label="Limpiar" className="absolute right-4 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-muted"><X className="h-4 w-4" /></button>}
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-30 border-b border-border bg-muted/85 backdrop-blur-xl md:top-20">
        <div className="container-x flex items-center gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {chip(undefined, "Todos")}
          {usbSubs.map((s) => chip(s.slug, s.name))}
          <span className="ml-auto hidden shrink-0 pl-4 text-sm text-muted-foreground md:block">{isUsb ? `${total} modelos` : ""}</span>
        </div>
      </div>

      <div className="container-x pt-8">
        {!isUsb ? (
          <div className="grid place-items-center rounded-[2rem] bg-background px-6 py-24 text-center">
            <p className="text-2xl font-bold">Próximamente en el catálogo en línea</p>
            <p className="mt-2 max-w-md text-muted-foreground">Esta categoría está disponible bajo cotización. Escríbenos por WhatsApp o explora nuestras memorias USB.</p>
            <Link to="/catalogo" className="mt-6 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Ver memorias USB</Link>
          </div>
        ) : (
          <>
            <div data-stagger className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((p) => <ProductCard key={p.id} p={p} onView={setView} />)}
              {status === "loading" && Array.from({ length: items.length ? 4 : 8 }, (_, i) => (
                <div key={`s${i}`} className="rounded-[1.6rem] bg-card p-2" data-done="1">
                  <div className="skeleton aspect-square rounded-[1.2rem]" />
                  <div className="space-y-2 p-3"><div className="skeleton h-3 w-1/2 rounded" /><div className="skeleton h-5 w-3/4 rounded" /><div className="skeleton mt-4 h-10 rounded-full" /></div>
                </div>
              ))}
            </div>
            <div ref={sentinel} className="h-px" />
            {status === "error" && (
              <div className="mt-10 flex flex-col items-center gap-3 rounded-[2rem] bg-background p-8 text-center">
                <p className="font-bold">No pudimos cargar más productos.</p>
                <p className="text-sm text-muted-foreground">Revisa tu conexión e inténtalo de nuevo.</p>
                <button onClick={() => load(items.length)} className="mt-2 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-ink-foreground"><RotateCw className="h-4 w-4" /> Reintentar</button>
              </div>
            )}
            {status === "done" && items.length > 0 && (
              <div className="mt-14 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> Has visto los {total} modelos disponibles <span className="h-px flex-1 bg-border" />
              </div>
            )}
            {status === "done" && items.length === 0 && (
              <div className="grid place-items-center rounded-[2rem] bg-background py-24 text-center">
                <p className="text-xl font-bold">Sin resultados para “{q}”</p>
                <button onClick={() => setTerm("")} className="mt-4 text-sm font-semibold text-primary">Limpiar búsqueda</button>
              </div>
            )}
          </>
        )}
      </div>

      <ProductView p={view} onClose={() => setView(null)} />
    </div>
  );
}

function ProductView({ p, onClose }: { p: Product | null; onClose: () => void }) {
  const [qty, setQty] = useState(MIN_ORDER);
  const [last, setLast] = useState<Product | null>(null);
  useEffect(() => { if (p) { setLast(p); setQty(MIN_ORDER); } }, [p]);
  const shown = p ?? last;
  const open = !!p;
  if (!shown) return null;
  const a = availability(shown.stock);
  const valid = qty >= MIN_ORDER;
  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}>
      <div onClick={onClose} className={`absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <div role="dialog" aria-label={shown.name} className={`absolute inset-x-0 bottom-0 mx-auto max-h-[92dvh] max-w-4xl overflow-y-auto rounded-t-[2rem] bg-background transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:bottom-auto md:top-1/2 md:rounded-[2rem] ${open ? "translate-y-0 opacity-100 md:-translate-y-1/2" : "translate-y-full opacity-0 md:-translate-y-[45%]"}`}>
        <button onClick={onClose} aria-label="Cerrar" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-background/90"><X className="h-4 w-4" /></button>
        <div className="grid md:grid-cols-2">
          <div className="aspect-square bg-muted"><img src={shown.image} alt={shown.name} className="h-full w-full object-cover" /></div>
          <div className="flex flex-col p-6 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{shown.styleName} · {shown.model}</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight">{shown.name}</h2>
            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-muted p-4"><dt className="text-muted-foreground">Capacidad</dt><dd className="mt-1 font-bold">{shown.capacity ?? "Varias"}</dd></div>
              <div className="rounded-2xl bg-muted p-4"><dt className="text-muted-foreground">Disponibilidad</dt><dd className="mt-1 flex items-center gap-2 font-bold"><span className={`h-2 w-2 rounded-full ${a.tone === "ok" ? "bg-success" : "bg-warning"}`} />{a.label}</dd></div>
            </dl>
            <label className="mt-6 text-sm font-semibold" htmlFor="qty">Cantidad (mínimo {MIN_ORDER})</label>
            <input id="qty" type="number" min={MIN_ORDER} step={10} value={qty} onChange={(e) => setQty(Number(e.target.value))} className={`mt-2 h-14 rounded-2xl border bg-background px-5 text-lg font-bold outline-none ${valid ? "border-border focus:border-primary/50" : "border-destructive"}`} />
            {!valid && <p className="mt-2 text-sm text-destructive">El pedido mínimo es de {MIN_ORDER} piezas por variante.</p>}
            <button
              disabled={!valid}
              onClick={() => { quote.add(shown.id, qty); toast.success(`${shown.name} agregado`, { description: `${qty} piezas` }); onClose(); }}
              className="group mt-auto flex h-14 items-center justify-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground shadow-red transition-opacity disabled:opacity-40 max-md:mt-8"
            >
              <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" /> Agregar a cotización
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"><Check className="h-3.5 w-3.5" /> Personalización con tu logotipo incluida en la propuesta</p>
          </div>
        </div>
      </div>
    </div>
  );
}
