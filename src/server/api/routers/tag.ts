import { TagCreateSchema } from '@/models/tags.model';
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const tagRouter = createTRPCRouter({

  getAllTags: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.tags.findMany();
    return data ?? null;
  }),

  createTag: protectedProcedure
    .input(TagCreateSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.tags.create({
        data: {
          name: input.name,
        },
      })
    }),
});
