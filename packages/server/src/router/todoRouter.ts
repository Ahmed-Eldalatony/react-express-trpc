import { trpc } from "../lib/trpc";
import { prisma } from "../lib/prismaClient";
import { z } from "zod";
export const todoRouter = trpc.router({
  list: trpc.procedure.query(({ ctx }) => {
    // const todos=  await prisma.todo.findMany()
    // return todos
    return prisma.todo.findMany();
  }),
  create: trpc.procedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
      const title = input.title;
      return prisma.todo.create({
        data: {
          title: title,
          isCompleted: false,
        },
      });
    }),
  delete: trpc.procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const id = input.id;
      return prisma.todo.delete({
        where: {
          id: id,
        },
      });
    }),
  update: trpc.procedure
    .input(z.object({ id: z.string(), isCompleted: z.boolean() }))
    .mutation(({ input }) => {
      const id = input.id;
      return prisma.todo.update({
        where: {
          id: id,
        },
        data: {
          isCompleted: input.isCompleted,
        },
      });
    }),
});
