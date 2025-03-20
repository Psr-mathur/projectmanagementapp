import { z } from 'zod';

export const TagSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z
    .string()
    .min(1, { message: "'name' is required and cannot be empty" })
});

export const TagCreateSchema = TagSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type TTagCreate = z.infer<typeof TagCreateSchema>;

export const TagUpdateSchema = TagSchema.partial().omit({ id: true, createdAt: true, updatedAt: true });
export type TTagUpdate = z.infer<typeof TagUpdateSchema>;