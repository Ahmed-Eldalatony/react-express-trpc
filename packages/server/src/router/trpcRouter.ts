import authRouter from "./authRouter";
import { getUserHandler } from "../lib/userController";
import { createContext } from "../utils/context";
import { protectedProcedure, t } from "../utils/trpc-server";

const statusCheckRouter = t.router({
  statusChecker: t.procedure.query(() => {
    return {
      status: "success",
      message: "Welcome to the trpc server",
    };
  }),
});
const userRouter = t.router({
  getUser: protectedProcedure.query(({ ctx }) => {
    return getUserHandler({ ctx });
  }),
});
export const appRouter = t.mergeRouters(
  statusCheckRouter,
  authRouter,
  userRouter
);

export type AppRouter = typeof appRouter;
