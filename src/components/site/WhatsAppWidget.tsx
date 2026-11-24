import { useState } from "react";
import { toast } from "sonner";
import { X, MessageCircle } from "lucide-react";
import logo from "@/assets/usbstock-logo.png.asset.json";
import s1 from "@/assets/seller-1.jpg";
import s2 from "@/assets/seller-2.jpg";
import s3 from "@/assets/seller-3.jpg";

// Demo data only — not connected to any service.
const sellers = [
  { name: "Mariana López", role: "Ventas corporativas", photo: s1, online: true },
  { name: "Carlos Méndez", role: "Proyectos especiales", photo: s2, online: true },
  { name: "Sofía Ramírez", role: "Atención a clientes", photo: s3, online: false },
];

function WaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        role="dialog"
        aria-label="Habla con un asesor"
        className={`fixed bottom-24 right-4 z-[45] w-[calc(100vw-2rem)] max-w-[360px] origin-bottom-right overflow-hidden rounded-[1.75rem] bg-background shadow-lift transition-[opacity,transform] duration-300 ease-out sm:right-5 ${open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0"}`}
      >
        <div className="relative bg-ink-gradient px-5 pb-6 pt-5 text-ink-foreground">
          <div className="tech-grid absolute inset-0 opacity-20" />
          <div className="relative flex items-center justify-between">
            <span className="rounded-xl bg-background px-3 py-2"><img src={logo.url} alt="USB Stock" className="h-5 w-auto" /></span>
            <button onClick={() => setOpen(false)} aria-label="Cerrar" className="grid h-9 w-9 place-items-center rounded-full bg-ink-foreground/10"><X className="h-4 w-4" /></button>
          </div>
          <p className="relative mt-5 text-lg font-bold leading-tight">¿Listo para personalizar?</p>
          <p className="relative mt-1 text-sm text-ink-foreground/60">Elige a un asesor y escríbele por WhatsApp.</p>
        </div>
        <ul className="space-y-1 p-3">
          {sellers.map((s) => (
            <li key={s.name}>
              <button
                disabled={!s.online}
                onClick={() => toast(`Chat con ${s.name}`, { description: "Demostración: aquí se abriría WhatsApp." })}
                className="group flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent"
              >
                <span className="relative shrink-0">
                  <img src={s.photo} alt={s.name} className="h-12 w-12 rounded-full object-cover" />
                  <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${s.online ? "bg-success" : "bg-muted-foreground"}`} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">{s.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{s.role} · {s.online ? "Disponible" : "No disponible"}</span>
                </span>
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform group-hover:translate-x-0.5 ${s.online ? "bg-success text-primary-foreground" : "bg-muted text-muted-foreground"}`}><MessageCircle className="h-4 w-4" /></span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar WhatsApp" : "Abrir WhatsApp"}
        aria-expanded={open}
        className="fixed bottom-5 right-4 z-[45] grid h-14 w-14 place-items-center rounded-full bg-success text-primary-foreground shadow-lift transition-transform duration-300 hover:-translate-y-0.5 sm:right-5"
      >
        <span className={`absolute transition-[opacity,transform] duration-300 ${open ? "rotate-90 opacity-0" : "opacity-100"}`}><WaIcon className="h-7 w-7" /></span>
        <span className={`absolute transition-[opacity,transform] duration-300 ${open ? "opacity-100" : "-rotate-90 opacity-0"}`}><X className="h-6 w-6" /></span>
      </button>
    </>
  );
}
