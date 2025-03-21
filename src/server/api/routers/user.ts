import { UserCreateSchema, UserUpdateSchema } from '@/models/user.model';
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { z } from 'zod';

export const userRouter = createTRPCRouter({

  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.user.findMany();
    return data ?? null;
  }),

  getUserById: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const data = await ctx.db.user.findUnique({ where: { id: input.id } });
    return data ?? null;
  }),

  createUser: protectedProcedure
    .input(UserCreateSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          email: input.email,
          name: input.name,
          password: input.password,
          avatar: input.avatar,
        },
      })
    }),

  updateUser: protectedProcedure
    .input(UserUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: input.id },
        data: {
          ...(input.email && { email: input.email }),
          ...(input.name && { name: input.name }),
          ...(input.avatar && { avatar: input.avatar }),
          ...(input.password && { password: input.password }),
        },
      });
    }),
});
