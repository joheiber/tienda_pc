import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CarritoProvider } from "@/context/CarritoContext";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NexusPC",
  description: "Tienda de componentes y productos para PC",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-white">
        <CarritoProvider>
          <Header />
          {children}
        </CarritoProvider>
      </body>
    </html>
  );
}