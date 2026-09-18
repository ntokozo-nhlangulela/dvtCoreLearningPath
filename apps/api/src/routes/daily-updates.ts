import { Router } from "express";
import { dailyUpdateSchema } from "../../../web/src/lib/validation/daily-update-schema.js";
import { prisma } from "../lib/prisma.js";
const router = Router();

    
router.get("/", async (req, res) => {
  try {
    const updates = await prisma.dailyUpdate.findMany({
        include: { feedback: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(updates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const result = dailyUpdateSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.format(),
    });
  }

  try {
    const update = await prisma.dailyUpdate.create({
      data: result.data, 
    });

    return res.status(201).json(update);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create update",
    });
  }
});

router.post("/:id/feedback", async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const feedback = await prisma.feedback.create({
      data: {
        comment,
        dailyUpdateId: id,
      },
    });

    return res.status(201).json(feedback);
  } catch (error) {
    console.error("Error creating feedback:", error);
    return res.status(500).json({ message: "Failed to add feedback" });
  }
});

export default router;