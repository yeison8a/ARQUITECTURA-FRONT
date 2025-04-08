'use client';
import { useState } from 'react';

export default function TransactionHistory() {
  const [accountNumber, setAccountNumber] = useState('');
  const [transactions, setTransactions] = useState([]);

  const handleSearch = () => {
    if (!accountNumber) return;
    fetch(`http://localhost:8080/api/transactions/${accountNumber}`)
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(error => console.error('Error al obtener transacciones:', error));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Historial de Transacciones</h2>

      <div className="flex items-center space-x-4 mb-6">
        <input
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Número de cuenta"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </div>

      {transactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Emisor</th>
                <th className="px-4 py-2 text-left">Receptor</th>
                <th className="px-4 py-2 text-left">Monto</th>
                <th className="px-4 py-2 text-left">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{tx.id}</td>
                  <td className="px-4 py-2">{tx.senderAccountNumber}</td>
                  <td className="px-4 py-2">{tx.receiverAccountNumber}</td>
                  <td className="px-4 py-2">${tx.amount}</td>
                  <td className="px-4 py-2">
                    {tx.date ? new Date(tx.date).toLocaleString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-sm mt-2">No hay transacciones para mostrar.</p>
      )}
    </div>
  );
}
