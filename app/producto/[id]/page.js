import Link from "next/link";
import { notFound } from "next/navigation";
import { obtenerProducto, formatoPrecio } from "@/lib/productos";
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
    <>
      <Link href="/" className="volver">← Volver al catálogo</Link>
      <div className="detalle">
        <div className="detalle-imagen">
          <span>{producto.nombre.charAt(0)}</span>
        </div>
        <div className="detalle-info">
          {producto.categoria && <span className="etiqueta">{producto.categoria}</span>}
          <h1>{producto.nombre}</h1>
          <p className="precio grande">{formatoPrecio(producto.precio)}</p>
          <p className="descripcion-larga">{producto.descripcion}</p>
          <p className={`stock ${producto.stock > 0 ? "" : "sin-stock"}`}>
            {producto.stock > 0 ? `${producto.stock} unidades disponibles` : "Sin stock"}
          </p>
          <BotonAgregar producto={producto} conCantidad />
        </div>
      </div>
    </>
  );
}
