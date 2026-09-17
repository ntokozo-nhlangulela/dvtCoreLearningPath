import { prisma } from "../src/lib/prisma.js";

async function main() {
 
await prisma.task.deleteMany();
  // Create a new task
  const task = await prisma.task.create({
   data: {
    title: "Create 1st screen",
    completed: true
  }
});
  // Fetch all tasks
  const allTasks = await prisma.task.findMany({
  });
  console.log("All tasks:", JSON.stringify(allTasks, null, 2));

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });