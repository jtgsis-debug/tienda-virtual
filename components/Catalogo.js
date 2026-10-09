"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import BotonAgregar from "./BotonAgregar";

const precio = (v) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD" }).format(Number(v));

export default function Catalogo({ productos }) {
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
      <div className="filtros">
        <input
          type="search"
          placeholder="Buscar productos…"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador"
        />
        <div className="chips">
          {categorias.map((c) => (
            <button
              key={c}
              className={`chip ${c === categoria ? "activa" : ""}`}
              onClick={() => setCategoria(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {visibles.length === 0 ? (
        <p className="vacio">No hay productos que coincidan.</p>
      ) : (
        <div className="rejilla">
          {visibles.map((p) => (
            <article key={p.id} className="tarjeta">
              <Link href={`/producto/${p.id}`} className="tarjeta-imagen" aria-label={p.nombre}>
                <span>{p.nombre.charAt(0)}</span>
              </Link>
              <div className="tarjeta-cuerpo">
                {p.categoria && <span className="etiqueta">{p.categoria}</span>}
                <h3>
                  <Link href={`/producto/${p.id}`}>{p.nombre}</Link>
                </h3>
                <p className="descripcion">{p.descripcion}</p>
                <div className="tarjeta-pie">
                  <strong className="precio">{precio(p.precio)}</strong>
                  <span className={`stock ${p.stock > 0 ? "" : "sin-stock"}`}>
                    {p.stock > 0 ? `${p.stock} en stock` : "Sin stock"}
                  </span>
                </div>
                <BotonAgregar producto={p} />
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
