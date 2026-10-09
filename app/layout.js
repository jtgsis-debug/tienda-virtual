import "./globals.css";
import { CarritoProvider } from "@/components/CarritoContext";
import Cabecera from "@/components/Cabecera";

export const metadata = {
  title: "TiendaTech · Tecnología premium",
  description: "Catálogo de productos de tecnología premium",
};

export const viewport = { themeColor: "#07060d" };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[#07060d] text-zinc-100 antialiased">
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-fuchsia-600/25 blur-[120px]" />
          <div className="absolute top-1/3 -left-40 h-[28rem] w-[28rem] rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute bottom-0 -right-40 h-[28rem] w-[28rem] rounded-full bg-cyan-500/15 blur-[120px]" />
        </div>
        <CarritoProvider>
          <Cabecera />
          <main className="mx-auto w-full max-w-6xl px-4 pb-24">{children}</main>
          <footer className="border-t border-white/10">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-zinc-500 sm:flex-row">
              <span>© {new Date().getFullYear()} TiendaTech</span>
              <span>Tecnología seleccionada con cuidado.</span>
            </div>
          </footer>
        </CarritoProvider>
      </body>
    </html>
  );
}
