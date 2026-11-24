import swivel from "@/assets/usb-swivel.jpg";
import wood from "@/assets/usb-wood.jpg";
import card from "@/assets/usb-card.jpg";
import metal from "@/assets/usb-metal.jpg";
import hero from "@/assets/hero-usb-clean.jpg";

export const MIN_ORDER = 50;

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  subs: { slug: string; name: string }[];
};

export const categories: Category[] = [
  {
    slug: "memorias-usb",
    name: "Memorias USB",
    blurb: "Giratorias, metálicas, tarjeta y madera.",
    subs: [
      { slug: "giratorias", name: "Giratorias" },
      { slug: "metalicas", name: "Metálicas" },
      { slug: "tarjetas", name: "Tarjetas" },
      { slug: "madera", name: "Madera" },
      { slug: "ecologicas", name: "Ecológicas" },
      { slug: "ejecutivas", name: "Ejecutivas" },
      { slug: "llaveros", name: "Llaveros" },
    ],
  },
  { slug: "cargadores", name: "Cargadores", blurb: "Power banks e inalámbricos.", subs: [{ slug: "power-banks", name: "Power banks" }, { slug: "inalambricos", name: "Inalámbricos" }, { slug: "cables", name: "Cables multipuerto" }] },
  { slug: "audio", name: "Audio", blurb: "Bocinas y audífonos.", subs: [{ slug: "audifonos", name: "Audífonos" }, { slug: "bocinas", name: "Bocinas" }] },
  { slug: "estuches", name: "Estuches", blurb: "Empaques para presentación.", subs: [{ slug: "estuches-madera", name: "Madera" }, { slug: "estuches-metal", name: "Metal" }, { slug: "estuches-carton", name: "Cartón premium" }] },
  { slug: "tecnologia", name: "Tecnología", blurb: "Accesorios de escritorio.", subs: [{ slug: "hubs", name: "Hubs USB" }, { slug: "mouse", name: "Mouse y pads" }, { slug: "lamparas", name: "Lámparas" }] },
  { slug: "bebidas", name: "Bebidas", blurb: "Termos y botellas.", subs: [{ slug: "termos", name: "Termos" }, { slug: "botellas", name: "Botellas" }, { slug: "tazas", name: "Tazas" }] },
];

export type Product = {
  id: string;
  name: string;
  model: string;
  style: string;
  styleName: string;
  capacity?: string;
  stock: number;
  image: string;
  quotable: boolean;
};

const styles: { slug: string; name: string; image: string; names: string[] }[] = [
  { slug: "giratorias", name: "Giratoria", image: swivel, names: ["Twist Classic", "Twist Color", "Swivel Pro", "Twist Slim"] },
  { slug: "metalicas", name: "Metálica", image: hero, names: ["Aero Steel", "Loop Metal", "Chrome Line", "Arc Alloy"] },
  { slug: "tarjetas", name: "Tarjeta", image: card, names: ["Card Slim", "Card Flip", "Wallet Card", "Card Print"] },
  { slug: "madera", name: "Madera", image: wood, names: ["Bamboo Tube", "Maple Cap", "Nogal Round", "Bamboo Mag"] },
  { slug: "ecologicas", name: "Ecológica", image: wood, names: ["Eco Fiber", "Eco Cork", "Leaf Drive", "Eco Bamboo"] },
  { slug: "ejecutivas", name: "Ejecutiva", image: metal, names: ["Executive Noir", "Graphite", "Exec Carbon", "Onyx Line"] },
  { slug: "llaveros", name: "Llavero", image: metal, names: ["Key Ring", "Key Mini", "Ring Steel", "Key Loop"] },
];
const capacities = ["8 GB", "16 GB", "32 GB", "64 GB", "128 GB"];

// Deterministic pseudo-random so SSR and client agree.
function rand(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const all: Product[] = Array.from({ length: 168 }, (_, i) => {
  const s = styles[i % styles.length]!;
  const variant = Math.floor(i / styles.length);
  const base = s.names[variant % s.names.length]!;
  const cap = capacities[Math.floor(rand(i) * capacities.length)]!;
  const stock = Math.floor(rand(i + 1000) * 2400);
  return {
    id: `p${i + 1}`,
    name: `${base}${variant >= s.names.length ? ` ${["II", "Plus", "Edge", "Air", "S"][variant % 5]}` : ""}`,
    model: `USB-${s.slug.slice(0, 3).toUpperCase()}-${String(100 + i).padStart(4, "0")}`,
    style: s.slug,
    styleName: s.name,
    ...(s.slug === "tarjetas" && rand(i + 7) > 0.7 ? {} : { capacity: cap }),
    stock,
    image: s.image,
    quotable: true,
  };
});

/** Public catalog never lists variants below the minimum order quantity. */
export const publicProducts = all.filter((p) => p.stock >= MIN_ORDER);

export function availability(stock: number): { label: string; tone: "ok" | "low" } {
  return stock >= 500 ? { label: "Disponible", tone: "ok" } : { label: "Stock limitado", tone: "low" };
}

export function findProduct(id: string) {
  return all.find((p) => p.id === id);
}

export type Query = { q?: string; cat?: string };

export function filterProducts({ q, cat }: Query) {
  const term = q?.trim().toLowerCase();
  return publicProducts.filter((p) => {
    if (cat && cat !== "memorias-usb" && p.style !== cat) return false;
    if (term && !`${p.name} ${p.model} ${p.styleName} ${p.capacity ?? ""}`.toLowerCase().includes(term)) return false;
    return true;
  });
}

let failedOnce = false;
/** Simulated AJAX page fetch for the infinite catalog. Fails once on the 3rd page to show the error state. */
export function fetchPage(query: Query, offset: number, limit: number) {
  return new Promise<{ items: Product[]; total: number }>((resolve, reject) => {
    setTimeout(() => {
      if (offset === 48 && !failedOnce) {
        failedOnce = true;
        reject(new Error("network"));
        return;
      }
      const list = filterProducts(query);
      resolve({ items: list.slice(offset, offset + limit), total: list.length });
    }, 700);
  });
}

export const featured = [publicProducts[0]!, publicProducts[1]!, publicProducts[2]!, publicProducts[3]!, publicProducts[5]!];
