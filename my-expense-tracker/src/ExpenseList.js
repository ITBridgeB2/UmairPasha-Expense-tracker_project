import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Expenselist.css';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/expenses")
      .then((res) => {
        setExpenses(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch expenses:", err);
      });
  }, []);

  const total = expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

  return (
    <div className="expense-container">
      <div className="header">
        <h1>My Expense Tracker</h1>
        <Link to="/add" className="add-btn">Add New Expense</Link>
      </div>
      <h2>Total Spent: ${total.toFixed(2)}</h2>
      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            ${parseFloat(e.amount).toFixed(2)} - {e.category} - {e.date}
            {" | "}
            <Link to={`/expense/${e.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
