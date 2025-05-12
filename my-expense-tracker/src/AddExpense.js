import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddExpense.css';

const AddExpense = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/expenses", {
        amount,
        category,
        date,
      })
      .then(() => navigate("/"));
  };

  return (
  <div className="add-expense-container">
    <h2>Add New Expense</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  </div>
);
}

export default AddExpense;