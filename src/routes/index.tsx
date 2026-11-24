import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Layers, Palette, PackageCheck, Sparkles, Cpu, ShieldCheck } from "lucide-react";
import hero from "@/assets/hero-usb-clean.jpg";
import desk from "@/assets/editorial-desk.jpg";
import swivel from "@/assets/usb-swivel.jpg";
import wood from "@/assets/usb-wood.jpg";
import card from "@/assets/usb-card.jpg";
import metal from "@/assets/usb-metal.jpg";
import { featured } from "@/lib/catalog";
import { getGsap, useScrollReveals } from "@/lib/motion";
import { ProductCard } from "@/components/site/ProductCard";
import { quoteDrawer } from "@/lib/quote";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "USB Stock — Tu marca, siempre presente" },
      { name: "description", content: "Memorias USB y productos tecnológicos personalizados para hacer destacar tu marca." },
      { property: "og:title", content: "USB Stock — Tu marca, siempre presente" },
      { property: "og:description", content: "Memorias USB y productos tecnológicos personalizados para empresas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Hero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-h-line] > span", { yPercent: 110, duration: 0.9, stagger: 0.08 })
        .from("[data-h-sub]", { y: 20, opacity: 0, duration: 0.6 }, "-=0.5")
        .from("[data-h-cta] > *", { y: 16, opacity: 0, duration: 0.5, stagger: 0.07 }, "-=0.35")
        .fromTo("[data-h-img]", { clipPath: "inset(18% 0% 18% 30% round 40px)", opacity: 0 }, { clipPath: "inset(0% 0% 0% 0% round 40px)", opacity: 1, duration: 1.1, ease: "power4.inOut" }, "-=0.7")
        .from("[data-h-img] img", { scale: 1.08, duration: 1.3, ease: "power3.out" }, "<")
        .from("[data-h-chip]", { y: 18, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.5");
      gsap.to("[data-h-float]", { y: -10, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-hero pt-24 md:pt-28">
      <div className="tech-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_70%_40%,black,transparent)]" />
      <div className="container-x relative grid items-center gap-10 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-24">
        <div className="relative z-10">
          <p data-h-chip className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-semibold backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Productos promocionales tecnológicos
          </p>
          <h1 className="mt-6 text-[clamp(2.9rem,8vw,7rem)] font-extrabold leading-[0.92] tracking-[-0.045em]">
            <span data-h-line className="block overflow-hidden pb-1"><span className="block">Tu marca,</span></span>
            <span data-h-line className="block overflow-hidden pb-2"><span className="block">siempre <span className="bg-red-gradient bg-clip-text text-transparent">presente.</span></span></span>
          </h1>
          <p data-h-sub className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Memorias USB y productos tecnológicos personalizados para hacer destacar tu marca.
          </p>
          <div data-h-cta className="mt-9 flex flex-wrap gap-3">
            <Link to="/catalogo" className="group inline-flex h-14 items-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground shadow-red transition-transform hover:-translate-y-0.5">
              Explorar productos <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button onClick={() => quoteDrawer.set(true)} className="inline-flex h-14 items-center rounded-full border border-foreground/15 bg-background/60 px-7 font-semibold backdrop-blur transition-colors hover:border-foreground">
              Solicitar cotización
            </button>
          </div>
        </div>

        <div className="relative">
          <div data-h-img className="relative aspect-[4/3.4] overflow-hidden rounded-[2.5rem] bg-muted shadow-lift">
            <img src={hero} alt="Memoria USB metálica premium con acento rojo" className="h-full w-full object-cover object-[70%_50%]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/10 via-transparent to-transparent" />
          </div>
          <div data-h-chip className="absolute -left-4 bottom-8 hidden md:block">
            <div data-h-float className="flex items-center gap-3 rounded-2xl bg-background/90 p-3 pr-5 shadow-lift backdrop-blur">
              <img src={swivel} alt="" className="h-14 w-14 rounded-xl object-cover" />
              <div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Estilo</p><p className="font-bold">Giratorias</p></div>
            </div>
          </div>
          <div data-h-chip className="absolute -top-3 right-6 flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-ink-foreground shadow-lift">
            <Cpu className="h-3.5 w-3.5 text-primary" /> Grabado láser · Impresión a color
          </div>
          <div data-h-chip className="absolute -bottom-4 right-8 hidden rounded-2xl bg-background/90 px-4 py-3 shadow-lift backdrop-blur sm:block">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Pedido mínimo</p>
            <p className="text-lg font-extrabold">50 piezas</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const cats = [
  { name: "Giratorias", slug: "giratorias", img: swivel, span: "md:col-span-2 md:row-span-2", tone: "bg-muted" },
  { name: "Madera", slug: "madera", img: wood, span: "", tone: "bg-accent" },
  { name: "Tarjetas", slug: "tarjetas", img: card, span: "", tone: "bg-muted" },
  { name: "Ejecutivas", slug: "ejecutivas", img: metal, span: "md:col-span-2", tone: "bg-ink" },
];

function Categories() {
  return (
    <section className="container-x py-24 md:py-32">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div data-reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Categorías destacadas</p>
          <h2 className="mt-3 max-w-xl text-4xl font-extrabold tracking-[-0.03em] md:text-6xl">Un estilo para cada marca.</h2>
        </div>
        <Link data-reveal to="/catalogo" className="group inline-flex items-center gap-2 font-semibold">Ver todo el catálogo <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
      </div>
      <div data-stagger className="mt-12 grid auto-rows-[220px] gap-4 md:grid-cols-4 md:auto-rows-[260px]">
        {cats.map((c) => (
          <Link key={c.slug} to="/catalogo" search={{ cat: c.slug }} className={`group relative overflow-hidden rounded-[2rem] ${c.tone} ${c.span} transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift`}>
            <img src={c.img} alt={`Memorias USB ${c.name.toLowerCase()}`} className={`absolute inset-0 h-full w-full object-cover ${c.tone === "bg-ink" ? "opacity-90" : "mix-blend-multiply"}`} />
            <div className={`absolute inset-x-0 bottom-0 flex items-end justify-between p-6 ${c.tone === "bg-ink" ? "bg-gradient-to-t from-ink/80 to-transparent text-ink-foreground" : ""}`}>
              <p className="text-2xl font-extrabold tracking-tight">{c.name}</p>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-background text-foreground transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Selection() {
  return (
    <section className="relative bg-muted py-24 md:py-32">
      <div className="container-x">
        <div data-reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="max-w-lg text-4xl font-extrabold tracking-[-0.03em] md:text-5xl">Selección de la temporada</h2>
          <p className="max-w-sm text-muted-foreground">Modelos disponibles para personalizar desde 50 piezas por variante.</p>
        </div>
        <div data-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}

const benefits = [
  { icon: Palette, t: "Impresión a todo color", d: "Tu logotipo con colores fieles en superficies planas y curvas." },
  { icon: Sparkles, t: "Grabado láser", d: "Acabado elegante y permanente en metal y madera." },
  { icon: Layers, t: "Carga de archivos", d: "Precargamos presentaciones, catálogos o videos de tu empresa." },
  { icon: PackageCheck, t: "Empaque de presentación", d: "Estuches en madera, metal o cartón con tu marca." },
];

function Personalization() {
  return (
    <section id="personalizacion" className="container-x grid gap-14 py-24 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p data-reveal className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Personalización</p>
        <h2 data-reveal className="mt-3 text-4xl font-extrabold tracking-[-0.03em] md:text-6xl">Detalles que hablan por tu marca.</h2>
        <div data-reveal-img className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-muted">
          <img data-parallax="18" src={metal} alt="Memoria USB ejecutiva grabada" className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover" />
        </div>
      </div>
      <ol data-stagger className="divide-y divide-border border-y border-border">
        {benefits.map((b, i) => (
          <li key={b.t} className="group grid grid-cols-[auto_minmax(0,1fr)] gap-6 py-8 md:grid-cols-[4rem_auto_minmax(0,1fr)] md:items-start">
            <span className="hidden font-mono text-sm text-muted-foreground md:block">0{i + 1}</span>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-primary transition-transform duration-300 group-hover:-translate-y-1"><b.icon className="h-6 w-6" /></span>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">{b.t}</h3>
              <p className="mt-2 max-w-md text-muted-foreground">{b.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

const steps = [
  { t: "Elige tus productos", d: "Explora el catálogo y agrega modelos a tu cotización." },
  { t: "Define cantidades", d: "Mínimo 50 piezas por variante, combina estilos y capacidades." },
  { t: "Envía tu solicitud", d: "Comparte tu logotipo y los detalles de personalización." },
  { t: "Recibe tu propuesta", d: "Un asesor te contacta con precios y muestra digital." },
];

function Process() {
  return (
    <section id="proceso" className="relative overflow-hidden bg-ink-gradient py-24 text-ink-foreground md:py-32">
      <div className="tech-grid absolute inset-0 opacity-[0.15]" />
      <div className="container-x relative">
        <p data-reveal className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Proceso de cotización</p>
        <h2 data-reveal className="mt-3 max-w-2xl text-4xl font-extrabold tracking-[-0.03em] md:text-6xl">De la idea a tu propuesta en cuatro pasos.</h2>
        <div data-stagger className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-ink-foreground/10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.t} className="group relative bg-ink p-8 transition-colors duration-500 hover:bg-ink/60">
              <span className="text-6xl font-extrabold text-ink-foreground/10 transition-colors duration-500 group-hover:text-primary">{i + 1}</span>
              <h3 className="mt-8 text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-foreground/60">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Editorial() {
  return (
    <section className="container-x py-24 md:py-32">
      <div className="relative">
        <div data-reveal-img className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] sm:aspect-[16/9]">
          <img data-parallax="30" src={desk} alt="Escritorio corporativo con memorias USB, cargador y audífonos personalizados" className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        </div>
        <div data-reveal className="absolute inset-x-4 bottom-4 rounded-[2rem] bg-background/90 p-6 backdrop-blur-xl sm:inset-x-auto sm:bottom-8 sm:left-8 sm:max-w-md md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Kits corporativos</p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">Una línea completa con tu identidad.</h2>
          <p className="mt-3 text-sm text-muted-foreground">Combina memorias, cargadores, audio y bebidas en un mismo kit para eventos, onboarding o regalos ejecutivos.</p>
          <Link to="/catalogo" className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">Explorar productos <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="container-x pb-28">
      <div data-reveal className="relative overflow-hidden rounded-[2.5rem] bg-red-gradient px-6 py-16 text-primary-foreground md:px-16 md:py-24">
        <div className="tech-grid absolute inset-0 opacity-20 [mask-image:linear-gradient(to_left,black,transparent)]" />
        <img data-parallax="20" src={hero} alt="" className="pointer-events-none absolute -right-24 top-1/2 hidden w-[620px] -translate-y-1/2 mix-blend-multiply md:block" />
        <div className="relative max-w-xl">
          <h2 className="text-4xl font-extrabold tracking-[-0.03em] md:text-6xl">Hagamos algo memorable.</h2>
          <p className="mt-4 text-lg text-primary-foreground/80">Cuéntanos tu proyecto y recibe una propuesta personalizada.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => quoteDrawer.set(true)} className="inline-flex h-14 items-center gap-2 rounded-full bg-background px-7 font-semibold text-foreground transition-transform hover:-translate-y-0.5">Solicitar cotización <ArrowRight className="h-4 w-4" /></button>
            <Link to="/catalogo" className="inline-flex h-14 items-center rounded-full border border-primary-foreground/40 px-7 font-semibold">Ver catálogo</Link>
          </div>
        </div>
        <ShieldCheck className="sr-only" />
      </div>
    </section>
  );
}

function Home() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveals(ref);
  return (
    <div ref={ref}>
      <Hero />
      <Categories />
      <Selection />
      <Personalization />
      <Process />
      <Editorial />
      <FinalCta />
    </div>
  );
}
