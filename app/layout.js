import "./globals.css";
import { CarritoProvider } from "@/components/CarritoContext";
import Cabecera from "@/components/Cabecera";

export const metadata = {
  title: "TiendaTech · Venta de productos",
  description: "Catálogo de productos de tecnología",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <CarritoProvider>
          <Cabecera />
          <main className="contenedor principal">{children}</main>
          <footer className="pie">
            <div className="contenedor">© {new Date().getFullYear()} TiendaTech</div>
          </footer>
        </CarritoProvider>
      </body>
    </html>
  );
}
