
import { Router } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../lib/prisma.js";


const router = Router();
const prisma = new PrismaClient({ adapter });

router.get("/", async (_, res) => {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  res.json(tasks);
});

export default router;