import { TRPCError } from "@trpc/server";
import Jwt from "jsonwebtoken";
import { prisma } from "./prismaClient";
var Cookies = require("cookies");
export const deserializeUser = async () => {
  const cookies = new Cookies();
  let token;
  try {
    if (cookies.get("token" /*{ signed: true }*/)) {
      token = cookies.get("token" /*{ signed: true }*/);
    }
    const notAuthenticated = {
      user: null,
    };
    if (!token) {
      return notAuthenticated;
    }

    const secret = process.env.JWT_SECRET!;
    const decoded = Jwt.verify(token, secret);
    if (!decoded) {
      return notAuthenticated;
    }
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.toString(), //decoded.sub?
      },
    });
    if (!user) {
      return notAuthenticated;
    }
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
    };
  } catch (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    });
  }
};
