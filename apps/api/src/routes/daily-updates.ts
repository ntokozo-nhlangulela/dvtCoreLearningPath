import { Router } from "express";
import { dailyUpdateSchema } from "../../../web/src/lib/validation/daily-update-schema.js";
import { prisma } from "../lib/prisma.js";
import { getIO } from "../socket.js";
const router = Router();

// GET daily updates (optionally filter by sprintId)
router.get("/", async (req, res) => {
  const { sprintId } = req.query;

  try {
    const updates = await prisma.dailyUpdate.findMany({
      where: sprintId ? { sprintId: String(sprintId) } : undefined,
      include: { feedback: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(updates);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new daily update linked to a sprint
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
    include: { feedback: true },
  });

   getIO().emit("daily-update-created", update);

  return res.status(201).json(update);
} catch (error) {
  return res.status(500).json({ message: "Failed to create update" });
}});

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
    getIO().emit("feedback-added", {
      id: feedback.id,
      dailyUpdateId: feedback.dailyUpdateId,
      comment: feedback.comment,
      createdAt: feedback.createdAt,
    });

    return res.status(201).json(feedback);
  } catch (error) {
    return res.status(500).json({ message: "Failed to add feedback" });
  }
});

export default router;