import "dotenv/config";
import express from 'express';
import cors from 'cors';
import { prisma } from "./lib/prisma.js";
const app = express();
const PORT = process.env.PORT || 4000;
// Middleware
app.use(cors());
app.use(express.json());
// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'API is running successfully with PostgreSQL 🚀' });
});
// GET /api/tasks (Fetches tasks from your PostgreSQL database)
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Start the Express server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
