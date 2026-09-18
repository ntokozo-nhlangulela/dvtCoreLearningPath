import { Router } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../lib/prisma.js";

const router = Router();
const prisma = new PrismaClient({ adapter });

// GET all tasks (optionally filter by sprintId via query params)
router.get("/", async (req, res) => {
  const { sprintId } = req.query;

  try {
    const tasks = await prisma.task.findMany({
      where: sprintId ? { sprintId: String(sprintId) } : undefined,
      orderBy: {
        createdAt: "asc",
      },
    });

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new task (associating it with a sprint if sprintId is provided)
router.post("/", async (req, res) => {
  const { title, sprintId } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Task title is required" });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        sprintId: sprintId || null, // Links to sprint if provided, otherwise null
      },
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ message: "Failed to create task" });
  }
});

export default router;