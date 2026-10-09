import Link from "next/link";

export default function NoEncontrado() {
  return (
    <div className="py-32 text-center">
      <h1 className="text-3xl font-bold">Página no encontrada</h1>
      <Link href="/" className="btn-primario mt-8 px-8">Volver al inicio</Link>
    </div>
  );
}
