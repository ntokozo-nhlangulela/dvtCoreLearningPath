export interface Task {
  id: string;
  title: string;
  completed: "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "BLOCKED" | "DONE";
}