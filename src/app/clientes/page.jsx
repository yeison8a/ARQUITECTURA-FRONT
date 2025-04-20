"use client";
import { useEffect, useState } from "react";
import CreateAccountForm from '../../components/CreateAccountForm';

export default function Page() {
  const [clientes, setClientes] = useState([]);

  const cargarClientes = () => {
    fetch("http://localhost:8080/api/customers")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Error al cargar clientes", err));
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const eliminarCliente = (id) => {
    fetch(`http://localhost:8080/api/customers/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("Cliente eliminado");
        cargarClientes(); // actualiza la lista
      })
      .catch((err) => console.error("Error al eliminar cliente", err));
  };

  return (
    <div className="p-6">
      {/* Componente de búsqueda */}
      <CreateAccountForm />

      {/* Lista de todos los clientes */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Lista de Clientes</h2>
      {clientes.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Cuenta</th>
              <th className="px-4 py-2">Saldo</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="border-t">
                <td className="px-4 py-2">{cliente.id}</td>
                <td className="px-4 py-2">{cliente.firstName} {cliente.lastName}</td>
                <td className="px-4 py-2">{cliente.accountNumber}</td>
                <td className="px-4 py-2">{cliente.balance}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => eliminarCliente(cliente.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
