// apps/web/src/types/sprint.ts
import { Task } from "./task"; // Assuming you have a Task type
import { DailyUpdate } from "./daily-update";

export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  tasks: Task[];
  dailyUpdates: DailyUpdate[];
}