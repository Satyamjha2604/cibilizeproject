const express = require("express");
const router = express.Router();

const GEMINI_MODEL = "gemini-2.5-flash-preview-05-20";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Validate API key on startup
if (!GEMINI_API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY in environment variables.");
}

// Response schema for structured prediction
const responseSchema = {
  type: "object",
  properties: {
    score: {
      type: "integer",
      description: "Predicted credit score, constrained between 300 and 900.",
    },
    reason: {
      type: "string",
      description:
        "A detailed explanation for the predicted score, describing major influencing factors.",
    },
  },
  required: ["score", "reason"],
};

// ---------------------------------------------
// POST /api/gemini/predict
// ---------------------------------------------
router.post("/predict", async (req, res) => {
  try {
    const { income, loanAmount, utilization, missedEMIs, age } = req.body;

    // Basic input validation
    if (
      [income, loanAmount, utilization, missedEMIs, age].some(
        (v) => v === null || v === undefined
      )
    ) {
      return res.status(400).json({
        score: null,
        reason:
          "Missing required fields: income, loanAmount, utilization, missedEMIs, or age.",
      });
    }

    // Numeric check
    const numericFields = { income, loanAmount, utilization, missedEMIs, age };
    for (const [key, value] of Object.entries(numericFields)) {
      if (isNaN(value)) {
        return res.status(400).json({
          score: null,
          reason: `Invalid data type for ${key}. Expected a number.`,
        });
      }
    }

    // Prompt for Gemini
    const prompt = `
You are an AI-powered credit score simulator. Based on the following financial data, predict a credit score (300–900) and give a detailed explanation.
Higher income, lower loan amount, lower utilization, and zero missed EMIs = higher score.
Lower income, high utilization, missed EMIs = lower score.

Return only valid JSON matching this schema:
{ "score": number, "reason": string }

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
        responseSchema,
      },
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const maxRetries = 3;
    let delay = 1000;

    // Retry loop for stability
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // ✅ use global fetch (Node 18+)
        const geminiResponse = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!geminiResponse.ok) {
          if (geminiResponse.status === 429) {
            console.warn(`⚠️ Rate limit hit. Retrying in ${delay}ms...`);
            await new Promise((r) => setTimeout(r, delay));
            delay *= 2;
            continue;
          }
          const errorData = await geminiResponse.json().catch(() => ({}));
          throw new Error(
            errorData.error?.message ||
              `Gemini API error (Status ${geminiResponse.status})`
          );
        }

        const data = await geminiResponse.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
          throw new Error("No structured content received from Gemini.");
        }

        let parsed;
        try {
          parsed = JSON.parse(text);
        } catch (jsonError) {
          console.error("❌ Failed to parse JSON from Gemini response:", text);
          throw new Error("Invalid JSON received from Gemini API.");
        }

        if (typeof parsed.score !== "number" || !parsed.reason) {
          throw new Error(
            "Structured JSON missing required keys ('score' or 'reason')."
          );
        }

        // ✅ Clamp score between 300–900
        parsed.score = Math.min(Math.max(parsed.score, 300), 900);

        console.log("✅ Gemini API call successful.");
        return res.status(200).json(parsed);
      } catch (error) {
        console.error(`❌ Attempt ${attempt} failed:`, error.message);
        if (attempt < maxRetries) {
          await new Promise((r) => setTimeout(r, delay));
          delay *= 2;
        } else {
          return res.status(500).json({
            score: null,
            reason: `Prediction failed after ${maxRetries} attempts. Final error: ${error.message}`,
          });
        }
      }
    }
  } catch (outerError) {
    console.error("❌ Unexpected server error:", outerError);
    return res.status(500).json({
      score: null,
      reason: "Unexpected server error. Please try again later.",
    });
  }
});

module.exports = router;
