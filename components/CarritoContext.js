"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CarritoContext = createContext(null);
const CLAVE = "carrito-tienda";

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([]);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE);
      if (guardado) setItems(JSON.parse(guardado));
    } catch {}
    setListo(true);
  }, []);

  useEffect(() => {
    if (!listo) return;
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items));
    } catch {}
  }, [items, listo]);

  function agregar(producto, cantidad = 1) {
    setItems((prev) => {
      const existente = prev.find((i) => i.id === producto.id);
      if (existente) {
        return prev.map((i) =>
          i.id === producto.id
            ? { ...i, cantidad: Math.min(i.cantidad + cantidad, producto.stock) }
            : i
        );
      }
      return [
        ...prev,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: Number(producto.precio),
          stock: producto.stock,
          cantidad: Math.min(cantidad, producto.stock),
        },
      ];
    });
  }

  function cambiarCantidad(id, cantidad) {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, cantidad: Math.max(0, Math.min(cantidad, i.stock)) } : i))
        .filter((i) => i.cantidad > 0)
    );
  }

  function quitar(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function vaciar() {
    setItems([]);
  }

  const totalUnidades = items.reduce((s, i) => s + i.cantidad, 0);
  const total = items.reduce((s, i) => s + i.cantidad * i.precio, 0);

  return (
    <CarritoContext.Provider
      value={{ items, agregar, cambiarCantidad, quitar, vaciar, totalUnidades, total, listo }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}
