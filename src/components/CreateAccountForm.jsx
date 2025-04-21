'use client'
import { useState } from 'react';

export default function CreateAccountForm() {
  const [formData, setFormData] = useState({
    accountNumber: '',
    balance: '',
    firstName: '',
    lastName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const customerDTO = {
        accountNumber: formData.accountNumber,
        balance: parseFloat(formData.balance),
        firstName: formData.firstName,
        lastName: formData.lastName
      };

      const response = await fetch('http://localhost:8080/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerDTO)
      });

      if (response.ok) {
        alert('Customer created successfully!');
        setFormData({
          accountNumber: '',
          balance: '',
          firstName: '',
          lastName: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        alert('Número de cuenta ya existe');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-8">
      <input
        type="text"
        name="accountNumber"
        placeholder="Número de cuenta"
        value={formData.accountNumber}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="balance"
        placeholder="Saldo"
        value={formData.balance}
        onChange={handleChange}
        required
        step="0.01"
        min="0"
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="firstName"
        placeholder="Nombre"
        value={formData.firstName}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Apellido"
        value={formData.lastName}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Crear cuenta
      </button>
    </form>
  );
}
