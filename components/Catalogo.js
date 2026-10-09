"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import BotonAgregar from "./BotonAgregar";
import FotoProducto from "./FotoProducto";

const precio = (v) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD" }).format(Number(v));

export default function Catalogo({ productos, paletas }) {
  const [categoria, setCategoria] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  const categorias = useMemo(
    () => ["Todas", ...new Set(productos.map((p) => p.categoria).filter(Boolean))],
    [productos]
  );

  const visibles = productos.filter(
    (p) =>
      (categoria === "Todas" || p.categoria === categoria) &&
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative md:w-80">
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            placeholder="Buscar productos…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="campo pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categorias.map((c) => (
            <button
              key={c}
              onClick={() => setCategoria(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                c === categoria
                  ? "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 text-white shadow-lg shadow-fuchsia-500/25"
                  : "border border-white/10 bg-white/5 text-zinc-300 hover:border-white/25 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {visibles.length === 0 ? (
        <p className="py-16 text-center text-zinc-400">No hay productos que coincidan.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibles.map((p) => (
            <article
              key={p.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/40 hover:shadow-2xl hover:shadow-fuchsia-500/10"
            >
              <Link
                href={`/producto/${p.id}`}
                aria-label={p.nombre}
                className="relative block aspect-[4/3] overflow-hidden bg-zinc-900"
              >
                <FotoProducto
                  producto={p}
                  paleta={paletas[p.id]}
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07060d]/70 via-transparent to-transparent" />
                {p.categoria && (
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
                    {p.categoria}
                  </span>
                )}
              </Link>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-lg font-semibold leading-snug">
                  <Link href={`/producto/${p.id}`} className="transition hover:text-fuchsia-300">
                    {p.nombre}
                  </Link>
                </h3>
                <p className="line-clamp-2 flex-1 text-sm text-zinc-400">{p.descripcion}</p>
                <div className="flex items-baseline justify-between">
                  <strong className="text-2xl font-bold tracking-tight">{precio(p.precio)}</strong>
                  <span className={`text-xs font-medium ${p.stock > 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {p.stock > 0 ? `● ${p.stock} en stock` : "Sin stock"}
                  </span>
                </div>
                <BotonAgregar producto={p} />
                <Link
                  href={`/registro?producto=${p.id}`}
                  className="text-center text-sm font-medium text-zinc-400 transition hover:text-fuchsia-300"
                >
                  Me interesa, quiero que me contacten →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
