# TiendaTech

Tienda en línea hecha con Next.js que lee el catálogo de la tabla `productos` de Supabase y se publica en Vercel.

- Catálogo con buscador y filtro por categoría
- Página de detalle de producto
- Carrito guardado en el navegador (el pago aún no está activo)

## Desarrollo

```bash
npm install
npm run dev
```

Opcionalmente puedes definir `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_KEY` (clave publicable); si no, se usan las del proyecto por defecto.
