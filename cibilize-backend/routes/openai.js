// routes/openai.js

const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Protected route to predict credit score
router.post("/predict", authenticateToken, async (req, res) => {
  const { income, loanAmount, utilization, missedEMIs, age } = req.body;

  const userQuery = `Predict a credit score based on the following financial information. 
      - Monthly Income: ₹${income}
      - Loan Amount: ₹${loanAmount}
      - Credit Utilization: ${utilization}%
      - Missed EMIs: ${missedEMIs}
      - Age: ${age}
      - Please provide a detailed reason for the score, including what factors contributed to it.
      - If you need more information to provide a more accurate prediction, please ask a question to the user in the reason field.`;

  const systemPrompt =
    "You are a world-class financial analyst specializing in credit scoring. Your task is to provide a concise, single-paragraph summary of the key findings, including a credit score prediction. The response must be a valid JSON object with two keys: 'score' (a number from 300-900) and 'reason' (a string). Do not include any text outside of the JSON object.";

  const payload = {
    model: "gpt-3.5-turbo", // Changed model to a more accessible version
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userQuery },
    ],
  };

  const apiUrl = "https://api.openai.com/v1/chat/completions";

  try {
    const openaiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const data = await openaiResponse.json();
    const text = data.choices?.[0]?.message?.content;
    const parsedJson = JSON.parse(text);

    res.json(parsedJson);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({
      score: "N/A",
      reason: `Error: Failed to get prediction. Please try again.`,
    });
  }
});

module.exports = router;
