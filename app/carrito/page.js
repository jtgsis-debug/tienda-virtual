"use client";
import Link from "next/link";
import { useState } from "react";
import { useCarrito } from "@/components/CarritoContext";

const precio = (v) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD" }).format(Number(v));

export default function Carrito() {
  const { items, cambiarCantidad, quitar, vaciar, total, listo } = useCarrito();
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  if (!listo) return null;

  if (pedidoEnviado) {
    return (
      <div className="vacio">
        <h1>¡Gracias por tu pedido!</h1>
        <p>El pago en línea aún no está activo; esta es una tienda de demostración.</p>
        <p><Link href="/" className="boton">Seguir comprando</Link></p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="vacio">
        <h1>Tu carrito está vacío</h1>
        <p><Link href="/" className="boton">Ver productos</Link></p>
      </div>
    );
  }

  return (
    <>
      <h1>Carrito</h1>
      <div className="carrito">
        <ul className="lista-carrito">
          {items.map((i) => (
            <li key={i.id} className="linea">
              <div>
                <Link href={`/producto/${i.id}`} className="linea-nombre">{i.nombre}</Link>
                <div className="linea-precio">{precio(i.precio)} c/u</div>
              </div>
              <div className="linea-acciones">
                <button className="boton-mini" onClick={() => cambiarCantidad(i.id, i.cantidad - 1)} aria-label="Restar">−</button>
                <span className="linea-cantidad">{i.cantidad}</span>
                <button className="boton-mini" onClick={() => cambiarCantidad(i.id, i.cantidad + 1)} aria-label="Sumar" disabled={i.cantidad >= i.stock}>+</button>
                <strong className="linea-subtotal">{precio(i.precio * i.cantidad)}</strong>
                <button className="enlace" onClick={() => quitar(i.id)}>Quitar</button>
              </div>
            </li>
          ))}
        </ul>
        <aside className="resumen">
          <div className="resumen-fila"><span>Total</span><strong>{precio(total)}</strong></div>
          <button
            className="boton ancho"
            onClick={() => {
              vaciar();
              setPedidoEnviado(true);
            }}
          >
            Finalizar compra
          </button>
          <p className="nota">Pago en línea próximamente.</p>
        </aside>
      </div>
    </>
  );
}
