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
      <div className="py-32 text-center">
        <h1 className="text-4xl font-bold">¡Gracias por tu pedido!</h1>
        <p className="mt-3 text-zinc-400">El pago en línea aún no está activo; esta es una tienda de demostración.</p>
        <Link href="/" className="btn-primario mt-8 px-8">Seguir comprando</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-4xl font-bold">Tu carrito está vacío</h1>
        <Link href="/#catalogo" className="btn-primario mt-8 px-8">Ver productos</Link>
      </div>
    );
  }

  return (
    <div className="pt-12">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Carrito</h1>
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        <ul className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
          {items.map((i) => (
            <li key={i.id} className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <Link href={`/producto/${i.id}`} className="font-semibold hover:text-fuchsia-300">{i.nombre}</Link>
                <div className="text-sm text-zinc-400">{precio(i.precio)} c/u</div>
              </div>
              <div className="flex items-center gap-3">
                <button className="btn-mini" onClick={() => cambiarCantidad(i.id, i.cantidad - 1)} aria-label="Restar">−</button>
                <span className="w-6 text-center">{i.cantidad}</span>
                <button className="btn-mini" onClick={() => cambiarCantidad(i.id, i.cantidad + 1)} aria-label="Sumar" disabled={i.cantidad >= i.stock}>+</button>
                <strong className="w-24 text-right">{precio(i.precio * i.cantidad)}</strong>
                <button className="text-sm text-rose-400 hover:text-rose-300" onClick={() => quitar(i.id)}>Quitar</button>
              </div>
            </li>
          ))}
        </ul>
        <aside className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-baseline justify-between">
            <span className="text-zinc-400">Total</span>
            <strong className="text-gradient text-3xl font-bold">{precio(total)}</strong>
          </div>
          <button
            className="btn-primario w-full"
            onClick={() => {
              vaciar();
              setPedidoEnviado(true);
            }}
          >
            Finalizar compra
          </button>
          <p className="text-center text-xs text-zinc-500">Pago en línea próximamente.</p>
        </aside>
      </div>
    </div>
  );
}
