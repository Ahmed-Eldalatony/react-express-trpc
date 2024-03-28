import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
const createContext =
  () =>
  ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
    const token = req.headers.authorization;
    const user = "Ahmed";
    return {
      user: user,
    };
  };
type Context = inferAsyncReturnType<typeof createContext>;
export const trpc = initTRPC.context<Context>().create();
