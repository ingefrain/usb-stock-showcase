import { Check, Eye, Plus } from "lucide-react";
import { useState } from "react";
import { availability, MIN_ORDER, type Product } from "@/lib/catalog";
import { quote, useQuote } from "@/lib/quote";
import { toast } from "sonner";

export function ProductCard({ p, onView }: { p: Product; onView?: (p: Product) => void }) {
  const items = useQuote();
  const inQuote = items.some((i) => i.id === p.id);
  const [pulse, setPulse] = useState(false);
  const a = availability(p.stock);

  const add = () => {
    quote.add(p.id, MIN_ORDER);
    setPulse(true);
    setTimeout(() => setPulse(false), 900);
    toast.success(`${p.name} agregado`, { description: `${MIN_ORDER} piezas · puedes ajustar la cantidad en tu cotización.` });
  };

  return (
    <article className="group relative flex flex-col rounded-[1.6rem] border border-transparent bg-card p-2 shadow-soft transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden rounded-[1.2rem] bg-muted">
        <img src={p.image} alt={`${p.name} — memoria USB ${p.styleName.toLowerCase()}`} loading="lazy" className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
          <span className={`h-1.5 w-1.5 rounded-full ${a.tone === "ok" ? "pulse-dot bg-success" : "bg-warning"}`} />
          {a.label}
        </span>
        {p.capacity && <span className="absolute right-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-bold text-ink-foreground">{p.capacity}</span>}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-2 gap-2 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 max-md:hidden">
          <button onClick={() => onView?.(p)} className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-background/95 py-2.5 text-xs font-semibold backdrop-blur transition-colors hover:bg-background">
            <Eye className="h-3.5 w-3.5" /> Ver producto
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-3 pb-2 pt-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{p.styleName} · {p.model}</p>
        <h3 className="mt-1 text-[17px] font-bold leading-snug tracking-tight">{p.name}</h3>
        <div className="mt-auto flex items-center gap-2 pt-4">
          <button onClick={() => onView?.(p)} className="flex-1 rounded-full border border-border py-2.5 text-xs font-semibold transition-colors hover:border-foreground md:hidden">Ver producto</button>
          <button
            onClick={add}
            className={`group/btn flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-semibold transition-[background-color,transform] duration-300 ${inQuote ? "bg-ink text-ink-foreground" : "bg-primary text-primary-foreground hover:shadow-red"} ${pulse ? "scale-[0.97]" : ""}`}
          >
            {inQuote ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:rotate-90" />}
            {inQuote ? "En cotización · +50" : "Agregar a cotización"}
          </button>
        </div>
      </div>
    </article>
  );
}
