import { TagSchema } from '@/models/tags.model';
import { TaskCreateSchema, TaskDeleteSchema, TaskUpdateSchema } from '@/models/task.model';
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { z } from 'zod';

export const taskRouter = createTRPCRouter({
  getAllCreatedTasks: protectedProcedure.input(TaskUpdateSchema.omit({ tags: true }).merge(z.object({ tags: z.array(TagSchema.pick({ id: true })).optional().default([]) }))).query(async ({ ctx, input }) => {
    const data = await ctx.db.task.findMany({
      where: {
        createdByUserId: ctx.session.user.id,
        AND: [
          {
            status: input.status,
            priority: input.priority,
            ...(input?.tags && input.tags.length > 0
              ? {
                tags: {
                  some: {
                    id: {
                      in: input.tags.map((tag) => tag.id),
                    },
                  },
                },
              }
              : {}),
          }
        ]
      },
      include: {
        tags: true,
        assignedToUser: true,
        createdByUser: true,
      },
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
    .input(TaskCreateSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          title: input.title,
          description: input.description,
          priority: input.priority,
          dueDate: input.dueDate,
          createdByUserId: ctx.session.user.id,
          assignedToUserId: input.assignedToUserId,
          status: input.status,
          tags: {
            connect: input.tags?.map((tag) => ({ id: tag.id })) ?? [],
          },
        },
      })
    }),

  updateTask: protectedProcedure
    .input(TaskUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.update({
        where: { id: input.id },
        data: {
          ...(input.title && { title: input.title }),
          ...(input.description && { description: input.description }),
          ...(input.priority && { priority: input.priority }),
          ...(input.dueDate && { dueDate: input.dueDate }),
          ...(input.status && { status: input.status }),
          ...(input.assignedToUserId && { assignedToUserId: input.assignedToUserId }),
          ...(input.tags && { tags: { set: input.tags.map((tag) => ({ id: tag.id })) } }),
        },
      });
    }),

  deleteTask: protectedProcedure
    .input(TaskDeleteSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.task.delete({ where: { id: input.id } });
    }),
});
