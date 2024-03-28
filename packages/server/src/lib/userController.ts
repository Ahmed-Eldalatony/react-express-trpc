import type { Context } from "../utils/context";
import { TRPCError } from "@trpc/server";

export const getUserHandler = async ({ ctx }: { ctx: Context }) => {
  try {
    const user = ctx.user;
    return {
      status: "success",
      data: { user },
    };
  } catch (error: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};
