import Link from "next/link";
import { notFound } from "next/navigation";
import { obtenerProducto, formatoPrecio, paleta } from "@/lib/productos";
import BotonAgregar from "@/components/BotonAgregar";
import FotoProducto from "@/components/FotoProducto";

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
        <div className="group relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 shadow-2xl shadow-fuchsia-500/10">
          <FotoProducto
            producto={producto}
            paleta={paleta(producto.id)}
            sizes="(min-width: 1024px) 560px, 100vw"
            prioridad
            letra="text-[9rem]"
          />
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
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
