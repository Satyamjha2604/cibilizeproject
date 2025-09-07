// routes/expenses.js
const express = require("express");
const { getConnection } = require("../db");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// All routes in this router are protected
router.use(authenticateToken);

router.get("/", async (req, res) => {
  try {
    const dbConnection = getConnection();
    const [rows] = await dbConnection.execute(
      "SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC",
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching expenses.", error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { description, amount, category, date } = req.body;
  try {
    const dbConnection = getConnection();
    const [result] = await dbConnection.execute(
      "INSERT INTO expenses (user_id, description, amount, category, date) VALUES (?, ?, ?, ?, ?)",
      [req.user.id, description, amount, category, date]
    );
    const newExpense = {
      id: result.insertId,
      userId: req.user.id,
      description,
      amount,
      category,
      date,
    };
    res.status(201).json(newExpense);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding expense.", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dbConnection = getConnection();
    const [result] = await dbConnection.execute(
      "DELETE FROM expenses WHERE id = ? AND user_id = ?",
      [id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          message:
            "Expense not found or you do not have permission to delete it.",
        });
    }
    res.json({ message: "Expense deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting expense.", error: err.message });
  }
});

module.exports = router;
