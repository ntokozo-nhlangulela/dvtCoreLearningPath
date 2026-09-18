import { Router } from "express";
import { prisma } from "../lib/prisma.js";
const router = Router();
import { dailyUpdateSchema } from "../../../web/src/lib/validation/daily-update-schema.js";

    
// apps/api/src/routes/daily-updates.ts (or similar)
router.get("/", async (req, res) => {
  try {
    const updates = await prisma.dailyUpdate.findMany({
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
      data: result.data, // Use the safely parsed & validated data
    });

    return res.status(201).json(update);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create update",
    });
  }
});

export default router;