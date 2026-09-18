import { Router } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../lib/prisma.js";


const router = Router();
const prisma = new PrismaClient({adapter});

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
  try {
    const update = await prisma.dailyUpdate.create({
      data: {
        completedWork: req.body.completedWork,
        nextFocus: req.body.nextFocus,
        blockers: req.body.blockers,
      },
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