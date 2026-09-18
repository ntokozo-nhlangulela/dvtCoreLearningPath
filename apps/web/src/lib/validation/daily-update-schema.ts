import { z } from "zod";

export const dailyUpdateSchema = z.object({
  completedWork: z
    .string()
    .min(10, "Completed work must be at least 10 characters"),

  nextFocus: z
    .string()
    .min(10, "Next focus must be at least 10 characters"),

  blockers: z
    .string()
    .max(500, "Blockers cannot exceed 500 characters")
    .optional(),

    sprintId: z.string().min(1, "Sprint ID is required"),
});

export type DailyUpdateFormValues =
  z.infer<typeof dailyUpdateSchema>;