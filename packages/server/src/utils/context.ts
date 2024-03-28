import { deserializeUser } from "../lib/authMiddleware";
import { inferAsyncReturnType } from "@trpc/server";

export const createContext = async () => deserializeUser();
export type Context = inferAsyncReturnType<typeof createContext>;
