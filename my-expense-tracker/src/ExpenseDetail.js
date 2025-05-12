import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './ExpenseDetail.css';

const ExpenseDetail = () => {
  const { id } = useParams();
  console.log(id); // Ensure this is not undefined or null

  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/expenses/${id}`)
      .then((res) => setExpense(res.data));
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/expenses/${id}`)
      .then(() => navigate("/"));
  };

  if (!expense) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>Expense Details</h2>
      <div className="expense-details">
        <p><strong>Amount:</strong> ${parseFloat(expense.amount).toFixed(2)}</p>
        <p><strong>Category:</strong> {expense.category}</p>
        <p><strong>Date:</strong> {expense.date}</p>
        <p><strong>Added:</strong> {expense.created_at ? new Date(expense.created_at).toLocaleString() : "N/A"}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate(`/edit/${id}`)} style={{ marginRight: "10px" }}>
          Edit Expense
        </button>
        <button onClick={handleDelete} style={{ backgroundColor: "#dc3545", color: "#fff" }}>
          Delete Expense
        </button>
      </div>
    </div>
  );
};

export default ExpenseDetail;
