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
    <div className="agregar">
      {conCantidad && !agotado && (
        <input
          type="number"
          min={1}
          max={producto.stock}
          value={cantidad}
          onChange={(e) => setCantidad(Math.max(1, Math.min(producto.stock, Number(e.target.value) || 1)))}
          aria-label="Cantidad"
          className="campo-cantidad"
        />
      )}
      <button className="boton" onClick={alPulsar} disabled={agotado}>
        {agotado ? "Agotado" : agregado ? "¡Añadido!" : "Añadir al carrito"}
      </button>
    </div>
  );
}
