"use server";
import { SUPABASE_URL, cabeceras } from "@/lib/supabase";

const CORREO = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function texto(formData, campo, max) {
  const valor = String(formData.get(campo) ?? "").trim();
  return valor.slice(0, max);
}

export async function registrarCliente(_estadoPrevio, formData) {
  const datos = {
    nombre: texto(formData, "nombre", 100),
    apellido: texto(formData, "apellido", 100),
    correo: texto(formData, "correo", 200).toLowerCase(),
    telefono: texto(formData, "telefono", 30) || null,
    direccion: texto(formData, "direccion", 300) || null,
    fecha_nacimiento: texto(formData, "fecha_nacimiento", 10) || null,
    producto_interes: texto(formData, "producto_interes", 12) || null,
    comentario: texto(formData, "comentario", 1000) || null,
  };

  const errores = {};
  if (!datos.nombre) errores.nombre = "Escribe tu nombre.";
  if (!datos.apellido) errores.apellido = "Escribe tu apellido.";
  if (!CORREO.test(datos.correo)) errores.correo = "Escribe un correo válido.";
  if (datos.telefono && !/^[+\d\s()-]{6,30}$/.test(datos.telefono))
    errores.telefono = "Escribe un teléfono válido.";
  if (datos.fecha_nacimiento && !/^\d{4}-\d{2}-\d{2}$/.test(datos.fecha_nacimiento))
    errores.fecha_nacimiento = "Fecha no válida.";
  if (datos.producto_interes && !/^\d+$/.test(datos.producto_interes))
    datos.producto_interes = null;
  if (formData.get("acepto") !== "on") errores.acepto = "Necesitamos tu permiso para contactarte.";

  if (Object.keys(errores).length > 0) {
    return { ok: false, errores, mensaje: "Revisa los campos marcados." };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/lista_clientes`, {
      method: "POST",
      headers: { ...cabeceras, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(datos),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Error al registrar cliente", res.status, await res.text());
      return { ok: false, errores: {}, mensaje: "No pudimos guardar tus datos. Inténtalo de nuevo." };
    }
  } catch (e) {
    console.error("Error al registrar cliente", e);
    return { ok: false, errores: {}, mensaje: "No pudimos guardar tus datos. Inténtalo de nuevo." };
  }

  return { ok: true, nombre: datos.nombre };
}
