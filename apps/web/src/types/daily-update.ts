import { Feedback } from "./feedback";

export interface DailyUpdate {
  id: string;
  completedWork: string;
  nextFocus: string;
  blockers?: string;
  createdAt: string;
  sprintId?: string;
  feedback?: Feedback[];
}