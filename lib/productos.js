import { SUPABASE_URL, cabeceras } from "./supabase";

async function consultar(query) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/productos?${query}`, {
    headers: cabeceras,
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Supabase respondió ${res.status}`);
  return res.json();
}

export async function obtenerProductos() {
  return consultar("select=*&order=id");
}

export async function obtenerProducto(id) {
  if (!/^\d+$/.test(String(id))) return null;
  const filas = await consultar(`select=*&id=eq.${id}`);
  return filas[0] ?? null;
}

export function formatoPrecio(valor) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD" }).format(Number(valor));
}

const paletas = [
  "from-violet-600 via-fuchsia-500 to-orange-400",
  "from-cyan-500 via-sky-500 to-indigo-600",
  "from-emerald-400 via-teal-500 to-cyan-600",
  "from-rose-500 via-pink-500 to-violet-600",
  "from-amber-400 via-orange-500 to-rose-600",
];

export function paleta(id) {
  return paletas[(Number(id) - 1 + paletas.length) % paletas.length];
}
