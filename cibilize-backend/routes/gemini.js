// routes/gemini.js
require("dotenv").config();
const express = require("express");
const router = express.Router();

const GEMINI_MODEL = "gemini-2.5-flash-preview-05-20";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Check API key
if (!GEMINI_API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY in environment variables.");
}

// POST /api/gemini/predict
router.post("/predict", async (req, res) => {
  try {
    const { income, loanAmount, utilization, missedEMIs, age } = req.body;

    // Basic validation
    if (
      [income, loanAmount, utilization, missedEMIs, age].some((v) => v == null)
    ) {
      return res.status(400).json({
        score: null,
        reason:
          "Missing required fields: income, loanAmount, utilization, missedEMIs, or age.",
      });
    }

    const numericFields = { income, loanAmount, utilization, missedEMIs, age };
    for (const [key, value] of Object.entries(numericFields)) {
      if (isNaN(value)) {
        return res.status(400).json({
          score: null,
          reason: `Invalid data type for ${key}. Expected a number.`,
        });
      }
    }

    // Prompt for Gemini API
    const prompt = `
You are an AI-powered credit score simulator. Based on the financial data, predict a credit score (300–900) and give a detailed explanation.
Higher income, lower loan amount, lower utilization, zero missed EMIs = higher score.
Lower income, high utilization, missed EMIs = lower score.

Return only valid JSON: { "score": number, "reason": string }

Financial Data:
- Monthly Income: ₹${income}
- Loan Amount: ₹${loanAmount}
- Credit Utilization: ${utilization}%
- Missed EMIs: ${missedEMIs}
- Age: ${age}
`;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Gemini API error`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("No content received from Gemini.");

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("Invalid JSON received from Gemini.");
    }

    parsed.score = Math.min(Math.max(parsed.score, 300), 900);
    if (!parsed.reason) parsed.reason = "No explanation provided.";

    res.json(parsed);
  } catch (err) {
    console.error("❌ Gemini predict error:", err.message);
    res.status(500).json({
      score: null,
      reason: `Prediction failed: ${err.message}`,
    });
  }
});

module.exports = router;
