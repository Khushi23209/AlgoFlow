const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { requireAuth } = require("../config/passport");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const rateLimit = require("express-rate-limit");

const aiLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5, 
  message: { error: "Too many requests. Please wait a moment before trying again." },
});
router.post("/explain",requireAuth,aiLimiter, async (req, res) => {
  try {
    const { code, currentStep, algorithm } = req.body;

    if (!code || !currentStep) {
      return res.status(400).json({ error: "code and currentStep are required" });
    }

    const prompt = `
      You are a helpful coding tutor. A student is solving a "${algorithm}" problem. Here's their code:
      ${code}

      They're looking at this step:
      ${JSON.stringify(currentStep, null, 2)}

      Explain in 2-3 short sentences what's happening at this specific step, in the context of ${algorithm}. Be concise and beginner-friendly.
      `;

   const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
    const result = await model.generateContent(prompt);
    const explanation = result.response.text();

    res.json({ explanation });

  } catch (err) {
        console.error("AI explain error:", err.message);

        if (err.message?.includes("429") || err.status === 429) {
            return res.status(429).json({ error: "AI service is busy right now. Please try again shortly." });
        }

        res.status(500).json({ error: "Couldn't generate an explanation right now." });
    }
});

router.post("/quiz", requireAuth, aiLimiter, async (req, res) => {
  try {
    const { code, algorithm } = req.body;

    if (!code || !algorithm) {
      return res.status(400).json({ error: "code and algorithm are required" });
    }

    const prompt = `
    Generate 10 multiple-choice questions that test understanding of the "${algorithm}" algorithm, based on this code:

    ${code}

    Questions should test conceptual understanding (e.g., time complexity, why a step happens, what would change with different input, edge cases) — not just ask to recall a line of code. Vary the difficulty and topic across the 10 questions.

    Respond with ONLY valid JSON, no other text, no markdown code fences, in this exact format:
    {
      "questions": [
        {
          "question": "the question text",
          "options": ["option A", "option B", "option C", "option D"],
          "correctIndex": 0,
          "explanation": "why this answer is correct, 1-2 sentences"
        }
      ]
    }
    The "questions" array must contain exactly 10 items.
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
        const result = await model.generateContent(prompt);
        const rawText = result.response.text();

        const cleanedText = rawText.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleanedText);

        res.json(parsed);

      } catch (err) {
        console.error("AI quiz error:", err.message);
        if (err.message?.includes("429") || err.status === 429) {
          return res.status(429).json({ error: "AI service is busy right now. Please try again shortly." });
        }
        res.status(500).json({ error: "Couldn't generate quiz questions right now." });
      }
    });

module.exports = router;