"use client";
import { useState } from "react";
import { useCarrito } from "./CarritoContext";

export default function BotonAgregar({ producto, conCantidad = false }) {
  const { agregar } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const agotado = producto.stock <= 0;

  function alPulsar() {
    agregar(producto, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1500);
  }

  return (
    <div className="flex gap-2">
      {conCantidad && !agotado && (
        <input
          type="number"
          min={1}
          max={producto.stock}
          value={cantidad}
          onChange={(e) => setCantidad(Math.max(1, Math.min(producto.stock, Number(e.target.value) || 1)))}
          aria-label="Cantidad"
          className="w-20 rounded-xl border border-white/15 bg-white/5 px-3 text-center outline-none focus:border-fuchsia-400"
        />
      )}
      <button
        onClick={alPulsar}
        disabled={agotado}
        className="btn-primario flex-1"
      >
        {agotado ? "Agotado" : agregado ? "¡Añadido! ✓" : "Añadir al carrito"}
      </button>
    </div>
  );
}
