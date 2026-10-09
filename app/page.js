import Link from "next/link";
import { obtenerProductos, paleta } from "@/lib/productos";
import Catalogo from "@/components/Catalogo";

export const dynamic = "force-dynamic";

export default async function Inicio() {
  let productos = [];
  let error = false;
  try {
    productos = await obtenerProductos();
  } catch {
    error = true;
  }
  const paletas = Object.fromEntries(productos.map((p) => [p.id, paleta(p.id)]));

  return (
    <>
      <section className="relative py-20 text-center sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-zinc-300 backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-r from-fuchsia-400 to-orange-300" />
          Nueva colección
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Tecnología que <span className="text-gradient">eleva</span> tu día a día
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          Equipos seleccionados con diseño, rendimiento y precios pensados para ti.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#catalogo" className="btn-primario px-8">Ver catálogo</a>
          <Link href="/registro" className="btn-secundario px-8">Quiero que me contacten</Link>
        </div>
      </section>

      <section id="catalogo" className="scroll-mt-24">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Catálogo</h2>
          <p className="mt-1 text-zinc-400">{productos.length} productos disponibles</p>
        </div>
        {error ? (
          <p className="py-16 text-center text-zinc-400">
            No se pudieron cargar los productos. Inténtalo de nuevo más tarde.
          </p>
        ) : (
          <Catalogo productos={productos} paletas={paletas} />
        )}
      </section>

      <section className="relative mt-24 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-600/30 via-fuchsia-600/20 to-orange-500/20 p-10 text-center sm:p-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.12),transparent_60%)]" />
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">¿Te interesa algún producto?</h2>
          <p className="mx-auto mt-3 max-w-lg text-zinc-300">
            Déjanos tus datos y te contactaremos con ofertas y disponibilidad.
          </p>
          <Link href="/registro" className="btn-primario mt-8 px-8">Registrarme</Link>
        </div>
      </section>
    </>
  );
}
