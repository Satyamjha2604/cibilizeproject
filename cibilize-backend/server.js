// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { initializeDatabase } = require("./db");
const authRouter = require("./routes/auth");
const expensesRouter = require("./routes/expenses");
const geminiRouter = require("./routes/gemini"); // ✅ Correct import
const multer = require("multer");
const { authenticateToken } = require("./middleware/auth");
const pdfParse = require("pdf-parse");
const { parseBankStatement } = require("./utils/pdfParser"); // ✅ For PDF extraction
const geminiChatRouter = require("./routes/geminiChat");

const app = express();
const PORT = 5000;

// ==================== Middleware ====================
app.use(cors());
app.use(express.json());

// ==================== Routes ====================
app.use("/api/auth", authRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/gemini", geminiRouter); // ✅ Gemini route (Credit Score Prediction)
app.use("/api/chat", geminiChatRouter);

// ==================== File Upload (PDF Parsing) ====================

// Use memoryStorage for in-memory file parsing
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Parse uploaded PDF and save extracted expenses
app.post(
  "/api/expenses/upload",
  authenticateToken,
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    try {
      // Read PDF buffer directly
      const data = await pdfParse(req.file.buffer);
      const rawText = data.text;

      // Extract expense data from text
      const extractedExpenses = parseBankStatement(rawText);

      // Insert extracted expenses into the database
      const dbConnection = require("./db").getConnection();
      const userId = req.user.id;

      for (const expense of extractedExpenses) {
        await dbConnection.execute(
          "INSERT INTO expenses (user_id, description, amount, category, date) VALUES (?, ?, ?, ?, ?)",
          [
            userId,
            expense.description,
            expense.amount,
            "Other ❓",
            expense.date,
          ]
        );
      }

      console.log(
        `✅ Successfully parsed and saved ${extractedExpenses.length} expenses from PDF.`
      );

      res.json({
        message: `Successfully parsed and saved ${extractedExpenses.length} expenses from the PDF!`,
      });
    } catch (err) {
      console.error("❌ PDF parsing or saving error:", err);
      res.status(500).json({
        message: "Failed to process PDF.",
        error: err.message,
      });
    }
  }
);

// ==================== Start Server ====================
async function startServer() {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

startServer();
