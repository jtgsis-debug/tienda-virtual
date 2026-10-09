"use client";
import Link from "next/link";
import { useCarrito } from "./CarritoContext";

export default function Cabecera() {
  const { totalUnidades } = useCarrito();
  return (
    <header className="cabecera">
      <div className="contenedor cabecera-fila">
        <Link href="/" className="logo">Tienda<span>Tech</span></Link>
        <Link href="/carrito" className="boton-carrito">
          Carrito <span className="contador">{totalUnidades}</span>
        </Link>
      </div>
    </header>
  );
}
