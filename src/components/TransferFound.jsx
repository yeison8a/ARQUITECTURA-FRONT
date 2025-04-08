'use client';
import { useState } from 'react';

export default function TransferFound() {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      senderAccountNumber: sender,
      receiverAccountNumber: receiver,
      amount: parseFloat(amount)
    };

    try {
      const response = await fetch('http://localhost:8080/api/transactions/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Error al transferir dinero');

      const result = await response.json();
      setMensaje('Transferencia realizada con éxito');
      setSender('');
      setReceiver('');
      setAmount('');
    } catch (error) {
      setMensaje('Error: ' + error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Transferencia de Dinero</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          placeholder="Cuenta origen"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          placeholder="Cuenta destino"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Monto"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          Transferir
        </button>
      </form>
      {mensaje && (
        <p className={`mt-4 text-center font-medium ${mensaje.startsWith('Error') ? 'text-red-500' : 'text-green-600'}`}>
          {mensaje}
        </p>
      )}
    </div>
  );
}
