import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string().uuid("Invalid format: 'id' must be a valid UUID"),
  createdAt: z.date().refine((value) => !isNaN(value.getTime()), { message: "'createdAt' must be a valid date" }),
  updatedAt: z.date().refine((value) => !isNaN(value.getTime()), { message: "'updatedAt' must be a valid date" }),
  title: z.string().min(1, { message: "'title' is required and cannot be empty" }),
  description: z.string().optional(),
  status: z.enum(["pending", "completed", "in-progress"], { errorMap: () => ({ message: "'status' must be one of: 'pending', 'completed', or 'in-progress'" }) }).default("pending"),
  priority: z.enum(["low", "medium", "high"], { errorMap: () => ({ message: "'priority' must be one of: 'low', 'medium', or 'high'" }) }).default("medium"),
  deadline: z.date().optional().refine((value) => !isNaN(value?.getTime() ?? NaN), { message: "'deadline' must be a valid date or null" }),
  assignedToUserId: z.string().uuid("Invalid format: 'assignedToUserId' must be a valid UUID").optional(),
  createdByUserId: z.string().uuid("Invalid format: 'createdByUserId' must be a valid UUID"),
});

export const TaskCreateSchema = TaskSchema.omit({ id: true, createdAt: true, updatedAt: true });

export const TaskUpdateSchema = TaskSchema.partial().omit({ id: true, createdAt: true, updatedAt: true, createdByUserId: true });
