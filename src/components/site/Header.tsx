import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Search, X, ClipboardList } from "lucide-react";
import { categories } from "@/lib/catalog";
import { quoteDrawer, useQuote } from "@/lib/quote";
import { Logo } from "./Logo";
import swivel from "@/assets/usb-swivel.jpg";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [active, setActive] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const items = useQuote();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const openMega = () => { window.clearTimeout(timer.current); setMega(true); };
  const closeMega = () => { timer.current = window.setTimeout(() => setMega(false), 140); };
  const cat = categories[active]!;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${scrolled || mega ? "bg-background/85 shadow-soft backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="container-x grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 md:h-20">
        <Logo className="h-7 md:h-8" />
        <nav className="hidden items-center justify-center gap-1 lg:flex" aria-label="Principal">
          <button
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            onFocus={openMega}
            onClick={() => setMega((v) => !v)}
            aria-expanded={mega}
            className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground"
          >
            Categorías
          </button>
          <Link to="/catalogo" className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground" activeProps={{ className: "text-primary" }}>Catálogo</Link>
          <a href="/#proceso" className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground">Cómo cotizar</a>
          <a href="/#contacto" className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground">Contacto</a>
        </nav>
        <div className="col-start-3 flex items-center gap-2">
          <Link to="/catalogo" aria-label="Buscar" className="hidden h-10 w-10 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-muted hover:text-foreground sm:grid">
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <button onClick={() => quoteDrawer.set(true)} className="group relative hidden h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-ink-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex">
            <ClipboardList className="h-4 w-4" /> Cotización
            {items.length > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] text-primary-foreground">{items.length}</span>}
          </button>
          <button onClick={() => setMobile(true)} aria-label="Abrir menú" className="grid h-11 w-11 place-items-center rounded-full lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mega menu */}
      <div
        onMouseEnter={openMega}
        onMouseLeave={closeMega}
        className={`absolute inset-x-0 top-full hidden origin-top border-t border-border bg-background/95 backdrop-blur-xl transition-[opacity,transform] duration-300 lg:block ${mega ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
      >
        <div className="container-x grid grid-cols-[260px_minmax(0,1fr)_320px] gap-10 py-10">
          <ul className="space-y-1">
            {categories.map((c, i) => (
              <li key={c.slug}>
                <button onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[15px] font-semibold transition-colors ${i === active ? "bg-muted text-foreground" : "text-foreground/60 hover:text-foreground"}`}>
                  {c.name}
                  <span className={`h-1.5 w-1.5 rounded-full bg-primary transition-opacity ${i === active ? "opacity-100" : "opacity-0"}`} />
                </button>
              </li>
            ))}
          </ul>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{cat.name}</p>
            <p className="mt-2 text-2xl font-bold tracking-tight">{cat.blurb}</p>
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-1">
              {cat.subs.map((s) => (
                <Link key={s.slug} to="/catalogo" search={{ cat: s.slug }} onClick={() => setMega(false)} className="group flex items-center justify-between border-b border-border py-3 text-[15px] font-medium text-foreground/75 transition-colors hover:text-foreground">
                  {s.name}
                  <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
          <Link to="/catalogo" onClick={() => setMega(false)} className="group relative overflow-hidden rounded-3xl bg-muted p-6">
            <img src={swivel} alt="" className="absolute -bottom-6 -right-6 h-56 w-56 object-cover mix-blend-multiply" />
            <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Catálogo completo</p>
            <p className="relative mt-2 max-w-[11rem] text-xl font-bold leading-tight">Explora todos los estilos</p>
            <span className="relative mt-24 inline-flex items-center gap-1 text-sm font-semibold text-primary">Ver catálogo <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-50 bg-background transition-[opacity,transform] duration-300 lg:hidden ${mobile ? "visible opacity-100" : "invisible translate-y-2 opacity-0"}`}>
        <div className="container-x flex h-16 items-center justify-between">
          <Logo className="h-7" />
          <button onClick={() => setMobile(false)} aria-label="Cerrar menú" className="grid h-11 w-11 place-items-center rounded-full bg-muted"><X className="h-5 w-5" /></button>
        </div>
        <div className="container-x h-[calc(100dvh-4rem)] overflow-y-auto pb-10">
          {categories.map((c) => (
            <details key={c.slug} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-xl font-bold">
                {c.name}
                <span className="relative h-3 w-3"><span className="absolute top-1/2 h-0.5 w-3 -translate-y-1/2 bg-foreground" /><span className="absolute top-1/2 h-0.5 w-3 -translate-y-1/2 rotate-90 bg-foreground transition-transform group-open:rotate-0" /></span>
              </summary>
              <div className="grid grid-cols-2 gap-2 pb-4">
                {c.subs.map((s) => (
                  <Link key={s.slug} to="/catalogo" search={{ cat: s.slug }} onClick={() => setMobile(false)} className="rounded-xl bg-muted px-3 py-3 text-sm font-medium">{s.name}</Link>
                ))}
              </div>
            </details>
          ))}
          <div className="mt-6 grid gap-3">
            <Link to="/catalogo" onClick={() => setMobile(false)} className="rounded-full bg-primary py-4 text-center font-semibold text-primary-foreground">Ver catálogo</Link>
            <button onClick={() => { setMobile(false); quoteDrawer.set(true); }} className="rounded-full bg-ink py-4 font-semibold text-ink-foreground">Mi cotización ({items.length})</button>
            <a href="/#contacto" onClick={() => setMobile(false)} className="py-3 text-center font-semibold">Contacto</a>
          </div>
        </div>
      </div>
    </header>
  );
}
