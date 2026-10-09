"use client";
import Link from "next/link";
import { useActionState } from "react";
import { registrarCliente } from "./actions";

function Campo({ etiqueta, nombre, error, children, opcional }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-zinc-300">
        {etiqueta} {opcional && <span className="text-zinc-500">(opcional)</span>}
      </span>
      {children}
      {error && <span className="text-xs text-rose-400" id={`${nombre}-error`}>{error}</span>}
    </label>
  );
}

export default function Formulario({ productos, productoInicial }) {
  const [estado, accion, enviando] = useActionState(registrarCliente, null);
  const e = estado?.errores ?? {};

  if (estado?.ok) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-3xl text-white shadow-lg shadow-emerald-500/30">
          ✓
        </div>
        <h2 className="text-2xl font-bold">¡Gracias, {estado.nombre}!</h2>
        <p className="max-w-sm text-zinc-400">
          Hemos guardado tus datos. Te contactaremos pronto con información y ofertas.
        </p>
        <Link href="/#catalogo" className="btn-primario mt-4 px-8">Seguir viendo productos</Link>
      </div>
    );
  }

  return (
    <form action={accion} className="grid gap-5 sm:grid-cols-2" noValidate>
      <Campo etiqueta="Nombre" nombre="nombre" error={e.nombre}>
        <input name="nombre" required maxLength={100} autoComplete="given-name" className="campo" aria-invalid={!!e.nombre} />
      </Campo>
      <Campo etiqueta="Apellido" nombre="apellido" error={e.apellido}>
        <input name="apellido" required maxLength={100} autoComplete="family-name" className="campo" aria-invalid={!!e.apellido} />
      </Campo>
      <Campo etiqueta="Correo electrónico" nombre="correo" error={e.correo}>
        <input name="correo" type="email" required maxLength={200} autoComplete="email" className="campo" aria-invalid={!!e.correo} />
      </Campo>
      <Campo etiqueta="Teléfono" nombre="telefono" error={e.telefono} opcional>
        <input name="telefono" type="tel" maxLength={30} autoComplete="tel" className="campo" aria-invalid={!!e.telefono} />
      </Campo>
      <div className="sm:col-span-2">
        <Campo etiqueta="Producto que te interesa" nombre="producto_interes" opcional>
          <select name="producto_interes" defaultValue={productoInicial ?? ""} className="campo">
            <option value="">Cualquiera / aún no lo sé</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </Campo>
      </div>
      <Campo etiqueta="Dirección" nombre="direccion" opcional>
        <input name="direccion" maxLength={300} autoComplete="street-address" className="campo" />
      </Campo>
      <Campo etiqueta="Fecha de nacimiento" nombre="fecha_nacimiento" error={e.fecha_nacimiento} opcional>
        <input name="fecha_nacimiento" type="date" className="campo [color-scheme:dark]" />
      </Campo>
      <div className="sm:col-span-2">
        <Campo etiqueta="Comentario" nombre="comentario" opcional>
          <textarea name="comentario" rows={3} maxLength={1000} className="campo resize-none" placeholder="¿Qué te gustaría saber?" />
        </Campo>
      </div>
      <label className="flex items-start gap-3 text-sm text-zinc-400 sm:col-span-2">
        <input type="checkbox" name="acepto" className="mt-0.5 h-4 w-4 accent-fuchsia-500" />
        <span>
          Acepto que TiendaTech guarde mis datos para contactarme sobre sus productos.
          {e.acepto && <span className="mt-1 block text-xs text-rose-400">{e.acepto}</span>}
        </span>
      </label>
      {estado?.mensaje && !estado.ok && (
        <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300 sm:col-span-2">
          {estado.mensaje}
        </p>
      )}
      <button type="submit" disabled={enviando} className="btn-primario sm:col-span-2">
        {enviando ? "Enviando…" : "Registrarme"}
      </button>
    </form>
  );
}
