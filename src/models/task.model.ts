import { z } from "zod";
import { TagCreateSchema, TagSchema } from './tags.model';
export const TaskSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  title: z
    .string()
    .min(1, { message: "'title' is required and cannot be empty" }),
  description: z
    .string()
    .optional(),
  status: z
    .enum(["TODO", "COMPLETED", "IN_PROGRESS"], {
      errorMap: () => ({ message: "'status' must be one of: 'pending', 'completed', or 'in-progress'" })
    }),
  priority: z
    .enum(["LOW", "MEDIUM", "HIGH"], {
      errorMap: () => ({ message: "'priority' must be one of: 'low', 'medium', or 'high'" })
    }),
  dueDate: z
    .date()
    .refine((val) => !isNaN(val.getTime()), { message: "'dueDate' must be a valid date" }),
  tags: z
    .array(TagSchema)
    .optional()
    .default([]),
  assignedToUserId: z
    .string()
    .uuid("Invalid format: 'assignedToUserId' must be a valid UUID")
    .optional(),
  createdByUserId: z
    .string()
    .uuid("Invalid format: 'createdByUserId' must be a valid UUID")
});

export const TaskCreateSchema = TaskSchema.omit({ id: true, createdAt: true, updatedAt: true, createdByUserId: true, tags: true }).merge(z.object({ tags: z.array(TagSchema.pick({ name: true, id: true })) }));
export type TTaskCreate = z.infer<typeof TaskCreateSchema>;

export const TaskUpdateSchema = TaskSchema.partial().omit({ createdAt: true, updatedAt: true, createdByUserId: true, tags: true }).merge(z.object({ tags: z.array(TagSchema.pick({ id: true, name: true })).optional() }));

export const TaskDeleteSchema = TaskSchema.pick({ id: true });
