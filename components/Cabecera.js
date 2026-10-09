"use client";
import Link from "next/link";
import { useCarrito } from "./CarritoContext";

export default function Cabecera() {
  const { totalUnidades } = useCarrito();
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07060d]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 text-sm font-black text-white shadow-lg shadow-fuchsia-500/30">
            T
          </span>
          <span>
            Tienda<span className="text-gradient">Tech</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm sm:gap-2">
          <Link href="/#catalogo" className="hidden rounded-full px-3 py-2 text-zinc-300 transition hover:text-white sm:block">
            Catálogo
          </Link>
          <Link
            href="/registro"
            className="rounded-full px-3 py-2 text-zinc-300 transition hover:text-white"
          >
            Registrarme
          </Link>
          <Link
            href="/carrito"
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-medium transition hover:border-fuchsia-400/60 hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 7h12l-1 13H7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            <span className="hidden sm:inline">Carrito</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-400 px-1.5 text-xs font-bold text-white">
              {totalUnidades}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
