import {
  createUserSchema,
  loginUserSchema,
  // CreateUserInput, // no those have no purpose when using input.body 😅
  // LoginUserInput,
} from "../lib/userSchema";
import { protectedProcedure, publicProcedure, t } from "../utils/trpc-server";
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from "../lib/authController";
const authRouter = t.router({
  registerUser: publicProcedure
    .input(createUserSchema)
    .mutation(({ input }) => registerHandler({ input: input.body })),
  loginUser: publicProcedure
    .input(loginUserSchema)
    .mutation(({ input }) => loginHandler({ input: input.body })),
  logoutUser: protectedProcedure.mutation(() => logoutHandler()),
});

export default authRouter;
