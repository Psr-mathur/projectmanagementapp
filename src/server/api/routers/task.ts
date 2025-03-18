import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

export const taskRouter = createTRPCRouter({
  getAllCreatedTasks: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.task.findMany({
      where: { createdByUserId: ctx.session.user.id },
    });
    return data ?? null;
  }),

  getAllAssignedTasks: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.task.findMany({
      where: { assignedToUserId: ctx.session.user.id },
    });
    return data ?? null;
  }),

  createTask: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        priority: z.string().default("medium"),
        deadline: z.string().optional(),
        createdByUserId: z.string(), // Ensure task is linked to a user
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          title: input.title,
          description: input.description,
          priority: input.priority,
          deadline: input.deadline ? new Date(input.deadline) : null,
          createdByUserId: input.createdByUserId,
        },
      })
    }),

  updateTask: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),

  deleteTask: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.task.delete({ where: { id: input.id } });
    }),
});
