import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './App.css';

const EditExpense = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/expenses/${id}`)
      .then((res) => {
        const { amount, category, date } = res.data;
        setAmount(amount);
        setCategory(category);
        setDate(date.slice(0, 10)); // format for input type="date"
      })
      .catch((err) => console.error("Failed to fetch expense:", err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/expenses/${id}`, {
        amount,
        category,
        date,
      })
      .then(() => navigate("/"))
      .catch((err) => console.error("Failed to update expense:", err));
  };

  return (
    <div className="container">
      <h2>Edit Expense</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          step="0.01"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Update Expense</button>
      </form>
    </div>
  );
};

export default EditExpense;
