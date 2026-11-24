import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { categories } from "@/lib/catalog";
import logo from "@/assets/usbstock-logo.png.asset.json";

export function Footer() {
  return (
    <footer id="contacto" className="bg-ink-gradient text-ink-foreground">
      <div className="container-x grid gap-12 py-20 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <div className="inline-block rounded-2xl bg-background px-4 py-3"><img src={logo.url} alt="USB Stock" className="h-7 w-auto" /></div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-foreground/60">Memorias USB y productos tecnológicos personalizados para empresas.</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-foreground/40">Categorías</p>
          <ul className="mt-5 space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.slug}><Link to="/catalogo" search={{ cat: c.slug }} className="text-ink-foreground/75 transition-colors hover:text-ink-foreground">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-foreground/40">Empresa</p>
          <ul className="mt-5 space-y-3 text-sm text-ink-foreground/75">
            <li><Link to="/catalogo" className="hover:text-ink-foreground">Catálogo</Link></li>
            <li><a href="/#proceso" className="hover:text-ink-foreground">Cómo cotizar</a></li>
            <li><a href="/#personalizacion" className="hover:text-ink-foreground">Personalización</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-foreground/40">Contacto</p>
          <ul className="mt-5 space-y-4 text-sm text-ink-foreground/75">
            <li className="flex gap-3"><Phone className="h-4 w-4 shrink-0 text-primary" /> (55) 0000 0000</li>
            <li className="flex gap-3"><Mail className="h-4 w-4 shrink-0 text-primary" /> ventas@usbstock.mx</li>
            <li className="flex gap-3"><MapPin className="h-4 w-4 shrink-0 text-primary" /> Ciudad de México</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-ink-foreground/40 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} USB Stock. Todos los derechos reservados.</p>
          <p>Pedido mínimo: 50 piezas por variante.</p>
        </div>
      </div>
    </footer>
  );
}
