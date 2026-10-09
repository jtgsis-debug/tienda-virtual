import { obtenerProductos } from "@/lib/productos";
import Formulario from "./Formulario";

export const dynamic = "force-dynamic";
export const metadata = { title: "Registro de interesados · TiendaTech" };

export default async function Registro({ searchParams }) {
  const { producto } = await searchParams;
  const productos = await obtenerProductos().catch(() => []);
  const productoInicial = productos.some((p) => String(p.id) === producto) ? producto : "";

  return (
    <div className="mx-auto max-w-2xl pt-16">
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Lista de interesados</span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Te <span className="text-gradient">avisamos</span> primero
        </h1>
        <p className="mt-4 text-zinc-400">
          Déjanos tus datos y te contactaremos con disponibilidad, novedades y ofertas exclusivas.
        </p>
      </div>
      <div className="rounded-[2rem] bg-gradient-to-br from-violet-500/60 via-fuchsia-500/40 to-orange-400/50 p-px shadow-2xl shadow-fuchsia-500/10">
        <div className="rounded-[calc(2rem-1px)] bg-[#0d0b16]/95 p-6 backdrop-blur sm:p-10">
          <Formulario productos={productos} productoInicial={productoInicial} />
        </div>
      </div>
    </div>
  );
}
