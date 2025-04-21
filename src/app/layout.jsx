import "./globals.css";
import Link from "next/link";
import NewAccount from "@/components/CreateAccountForm";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-gray-100 text-gray-900 min-h-screen">
        <div className="max-w-5xl mx-auto p-6">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">BANCO UDEA</h1>
            <nav className="flex justify-center space-x-6 bg-white shadow-md p-4 rounded-2xl">
              <Link
                href="/clientes"
                className="text-blue-700 hover:text-blue-900 font-medium transition"
              >
                Consultar clientes
              </Link>
              <Link
                href="/transactions"
                className="text-blue-700 hover:text-blue-900 font-medium transition"
              >
                Realizar transferencia
              </Link>
              <Link
                href="/transactionHistory"
                className="text-blue-700 hover:text-blue-900 font-medium transition"
              >
                Histórico de las transacciones
              </Link>
              <Link
                href="/nuevos"
                className="text-blue-700 hover:text-blue-900 font-medium transition"
              >
                Crear nueva cuenta
              </Link>
            </nav>
          </header>
          <main className="bg-white p-6 rounded-2xl shadow-md">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}