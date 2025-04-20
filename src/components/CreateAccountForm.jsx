'use client';
import { useState } from 'react';

export default function CreateAccountForm() {
  const [accountNumber, setAccountNumber] = useState('');
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!accountNumber) {
      setError('Please enter an account number');
      setCustomer(null);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/customers/account/${accountNumber}`);
      if (!response.ok) {
        throw new Error('Customer not found');
      }
      const data = await response.json();
      setCustomer(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setCustomer(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Buscar Cliente por Número de Cuenta</h2>
      
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Número de Cuenta"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </div>

      {error && (
        <p className="text-red-600 mb-4 font-medium">{error}</p>
      )}

     {customer && (
       <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
         <h3 className="text-xl font-semibold text-gray-800 mb-2">Información del Cliente</h3>
         <p><span className="font-medium">ID:</span> {customer.id}</p>
         <p><span className="font-medium">Nombre:</span> {customer.firstName} {customer.lastName}</p>
         <p><span className="font-medium">Número de Cuenta:</span> {customer.accountNumber}</p>
         <p><span className="font-medium">Saldo:</span> ${customer.balance}</p>

         <button
           onClick={async () => {
             try {
               const response = await fetch(`http://localhost:8080/api/customers/${customer.id}`, {
                 method: 'DELETE',
               });

               if (response.ok) {
                 setCustomer(null);
                 alert('Cliente eliminado correctamente.');
               } else {
                 alert('Error al eliminar el cliente.');
               }
             } catch (error) {
               alert('Error al eliminar el cliente.');
               console.error(error);
             }
           }}
           className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
         >
           Eliminar Cliente
         </button>
       </div>
     )}

    </div>
  );
}
