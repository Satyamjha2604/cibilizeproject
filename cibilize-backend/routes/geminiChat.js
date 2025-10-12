// routes/geminiChat.js
require("dotenv").config();
const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /api/chat
router.post("/", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Question is required" });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-05-20",
    });

    const prompt = `
You are a financial advisor chatbot specialized in credit scores and financial literacy.
Answer the user's question clearly and in an easy-to-understand manner.
User's question: "${question}"
`;

    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    res.json({ reply: aiResponse });
  } catch (error) {
    console.error("❌ Gemini AI chat error:", error);
    res
      .status(500)
      .json({ message: "Error generating response", error: error.message });
  }
});

module.exports = router;
