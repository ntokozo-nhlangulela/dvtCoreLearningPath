import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

// Load environment variables from .env file
dotenv.config();

const app = express();
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'API is running successfully 🚀' });
});

// GET /api/tasks (Ready for your Prisma & SQLite integration)
app.get('/api/tasks', async (req, res) => {
  try {
    // Once you've created your Prisma model, you can fetch from the database like this:
    // const tasks = await prisma.task.findMany();
    // res.json(tasks);

    // Temporary placeholder response:
    res.json([]);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});