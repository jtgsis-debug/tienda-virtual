import { obtenerProductos } from "@/lib/productos";
import Catalogo from "@/components/Catalogo";

export const dynamic = "force-dynamic";

export default async function Inicio() {
  let productos = [];
  let error = null;
  try {
    productos = await obtenerProductos();
  } catch (e) {
    error = e.message;
  }

  return (
    <>
      <section className="hero">
        <h1>Tecnología al mejor precio</h1>
        <p>Descubre nuestro catálogo y añade tus productos favoritos al carrito.</p>
      </section>
      {error ? (
        <p className="vacio">No se pudieron cargar los productos. Inténtalo de nuevo más tarde.</p>
      ) : (
        <Catalogo productos={productos} />
      )}
    </>
  );
}
