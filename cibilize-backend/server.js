// ==================== Load Environment Variables ====================
require("dotenv").config();

// ==================== Imports ====================
const express = require("express");
const cors = require("cors");

// Local Imports
const { initializeDatabase } = require("./db");

// Route Imports
const authRouter = require("./routes/auth");
const expensesRouter = require("./routes/expenses");
const geminiRouter = require("./routes/gemini");
const geminiChatRouter = require("./routes/geminiChat");

// ==================== App Setup ====================
const app = express();
const PORT = process.env.PORT || 5000;

// ==================== Middleware ====================
app.use(cors());
app.use(express.json());

// ==================== API Routes ====================
app.use("/api/auth", authRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/gemini", geminiRouter);
app.use("/api/chat", geminiChatRouter);

// ==================== Health Check ====================
app.get("/", (req, res) => {
  res.send("✅ Cibilize Backend is Running Successfully with Neon DB!");
});

// ==================== Global Error Handler ====================
app.use((err, req, res, next) => {
  console.error("🔥 Global Error Handler:", err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    details: err.message,
  });
});

// ==================== Start Server ====================
async function startServer() {
  try {
    console.log("🔄 Initializing Neon PostgreSQL database...");
    await initializeDatabase();
    console.log("✅ Database initialized successfully!");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    process.exit(1);
  }
}

startServer();
