import { Router } from "express";
import { generateCoachFeedback } from "../services/ai-coach.service.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      completedWork,
      nextFocus,
      blockers,
    } = req.body;

    const feedback = await generateCoachFeedback(
      completedWork,
      nextFocus,
      blockers
    );

    res.json({
      feedback,
    });
  } catch (error: any) {
    // 🔍 Print the real error to your backend server logs
    console.error("DETAILED AI COACH ERROR:", error?.message || error);

    res.status(500).json({
      message: "AI Coach failed",
      error: error?.message, // Send it back temporarily to debug
    });
  }
});

export default router;