import Link from "next/link";
import { notFound } from "next/navigation";
import { obtenerProducto, formatoPrecio, paleta } from "@/lib/productos";
import BotonAgregar from "@/components/BotonAgregar";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const producto = await obtenerProducto(id).catch(() => null);
  return { title: producto ? `${producto.nombre} · TiendaTech` : "Producto · TiendaTech" };
}

export default async function PaginaProducto({ params }) {
  const { id } = await params;
  const producto = await obtenerProducto(id);
  if (!producto) notFound();

  return (
    <div className="pt-10">
      <Link href="/#catalogo" className="text-sm text-zinc-400 transition hover:text-white">
        ← Volver al catálogo
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className={`relative grid min-h-[20rem] place-items-center overflow-hidden rounded-[2rem] bg-gradient-to-br ${paleta(producto.id)} lg:min-h-[28rem]`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.4),transparent_55%)]" />
          <span className="relative text-[9rem] font-black text-white/90 drop-shadow-2xl">
            {producto.nombre.charAt(0)}
          </span>
        </div>
        <div className="flex flex-col justify-center gap-5">
          {producto.categoria && (
            <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-fuchsia-300">
              {producto.categoria}
            </span>
          )}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{producto.nombre}</h1>
          <p className="text-gradient text-4xl font-bold">{formatoPrecio(producto.precio)}</p>
          <p className="text-lg leading-relaxed text-zinc-400">{producto.descripcion}</p>
          <p className={`text-sm font-medium ${producto.stock > 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {producto.stock > 0 ? `● ${producto.stock} unidades disponibles` : "Sin stock"}
          </p>
          <div className="max-w-md">
            <BotonAgregar producto={producto} conCantidad />
          </div>
          <Link href={`/registro?producto=${producto.id}`} className="btn-secundario max-w-md">
            Me interesa, quiero que me contacten
          </Link>
        </div>
      </div>
    </div>
  );
}
