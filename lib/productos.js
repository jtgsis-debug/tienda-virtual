const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yunskddgdtwlfrlvsbud.supabase.co";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY || "sb_publishable_0VgNwuZg5r62P6DOVIxVMg_4zPheQIs";

async function consultar(query) {
  const res = await fetch(`${URL}/rest/v1/productos?${query}`, {
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
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
