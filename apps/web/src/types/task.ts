export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "BLOCKED" | "DONE";
}