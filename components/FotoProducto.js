"use client";
import Image from "next/image";
import { useState } from "react";

export default function FotoProducto({ producto, paleta, sizes, prioridad = false, letra = "text-7xl" }) {
  const [fallo, setFallo] = useState(false);

  if (!producto.imagen_url || fallo) {
    return (
      <div className={`absolute inset-0 grid place-items-center bg-gradient-to-br ${paleta}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.35),transparent_55%)]" />
        <span className={`relative font-black text-white/90 drop-shadow-xl ${letra}`}>
          {producto.nombre.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={producto.imagen_url}
      alt={producto.nombre}
      fill
      sizes={sizes}
      priority={prioridad}
      onError={() => setFallo(true)}
      className="object-cover transition duration-700 group-hover:scale-105"
    />
  );
}
