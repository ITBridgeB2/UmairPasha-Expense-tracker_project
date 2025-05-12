const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "userExpense",
});

db.connect(err => {
  if (err) return console.error("Database connection failed:", err);
  console.log("✅ Connected to MySQL database.");
});

// Utility: handle query response
const handleQuery = (res, err, results, single = false) => {
  if (err) return res.status(500).json({ error: err.message });
  if (single && results.length === 0) return res.status(404).json({ error: "Not found" });
  res.json(single ? results[0] : results);
};

// Routes

// Get all expenses
app.get("/api/expenses", (req, res) => {
  db.query("SELECT * FROM expenses ORDER BY date DESC", (err, results) =>
    handleQuery(res, err, results)
  );
});

// Get a single expense by ID
app.get("/api/expenses/:id", (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: "Invalid ID" });

  db.query("SELECT * FROM expenses WHERE id = ?", [id], (err, results) =>
    handleQuery(res, err, results, true)
  );
});

// Create a new expense
app.post("/api/expenses", (req, res) => {
  const { amount, category, date } = req.body;
  db.query(
    "INSERT INTO expenses (amount, category, date) VALUES (?, ?, ?)",
    [amount, category, date],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, amount, category, date });
    }
  );
});

// Update an existing expense
app.put("/api/expenses/:id", (req, res) => {
  const { amount, category, date } = req.body;
  const id = req.params.id;
  db.query(
    "UPDATE expenses SET amount = ?, category = ?, date = ? WHERE id = ?",
    [amount, category, date, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Expense not found" });
      res.json({ id, amount, category, date });
    }
  );
});

// Delete an expense
app.delete("/api/expenses/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM expenses WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Expense not found" });
    res.json({ message: "Deleted successfully" });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
