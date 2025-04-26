import { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config';
import './AddTransaction.css';

function AddTransaction({ token, type, onClose, onTransactionAdded }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async () => {
    if (!title || !category || !amount || !date) {
      alert('Please fill all required fields!');
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/transactions`, {
        title,
        type,
        category,
        description,
        date,
        amount: parseFloat(amount),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onTransactionAdded();
      onClose();
    } catch (err) {
      alert('Error adding transaction');
    }
  };

  return (
    // your JSX
  );
}

export default AddTransaction;
