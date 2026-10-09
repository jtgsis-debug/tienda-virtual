# TiendaTech

Tienda en línea premium hecha con Next.js y Tailwind CSS. Lee el catálogo de la tabla `productos` de Supabase, guarda a los interesados en la tabla `lista_clientes` y se publica en Vercel.

- Catálogo con buscador y filtro por categoría
- Página de detalle de producto
- Formulario de registro de interesados (`/registro`)
- Carrito guardado en el navegador (el pago aún no está activo)

## Desarrollo

```bash
npm install
npm run dev
```

Opcionalmente puedes definir `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_KEY` (clave publicable); si no, se usan las del proyecto por defecto.
