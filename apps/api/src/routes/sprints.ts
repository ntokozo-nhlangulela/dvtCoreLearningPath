// apps/api/src/routes/sprints.ts
import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

// GET all sprints
router.get("/", async (req, res) => {
  try {
    const sprints = await prisma.sprint.findMany({
      orderBy: { startDate: "desc" },
    });
    res.json(sprints);
  } catch (error) {
    console.error("Error fetching sprints:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST a new sprint (ADD THIS)
router.post("/", async (req, res) => {
  const { name, startDate, endDate, isActive } = req.body;

  try {
    const sprint = await prisma.sprint.create({
      data: {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isActive: isActive ?? false,
      },
    });

    return res.status(201).json(sprint);
  } catch (error) {
    console.error("Error creating sprint:", error);
    return res.status(500).json({ message: "Failed to create sprint" });
  }
});

// GET single sprint with tasks and daily updates
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const sprint = await prisma.sprint.findUnique({
      where: { id },
      include: {
        tasks: true,
        dailyUpdates: {
          include: { feedback: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!sprint) {
      return res.status(404).json({ message: "Sprint not found" });
    }

    return res.json(sprint);
  } catch (error) {
    console.error("Error fetching sprint details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;