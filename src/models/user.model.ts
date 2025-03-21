import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  email: z
    .string()
    .email({ message: "'email' must be a valid email address" })
    .nonempty({ message: "'email' is required" }),
  name: z.string().optional(),
  avatar: z.string().optional(),
  password: z
    .string()
    .min(8, { message: "'password' must be at least 8 characters long" })
    .nonempty({ message: "'password' is required" }),
  createdTasks: z.array(z.string().uuid()).optional().default([]),
  assignedTasks: z.array(z.string().uuid()).optional().default([]),
});

export const UserCreateSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  createdTasks: true,
  assignedTasks: true,
});

export type TUSer = z.infer<typeof UserSchema>;
export type TUserCreate = z.infer<typeof UserCreateSchema>;

export const UserUpdateSchema = UserSchema.partial().omit({
  createdAt: true,
  updatedAt: true,
});
export type TUserUpdate = z.infer<typeof UserUpdateSchema>;