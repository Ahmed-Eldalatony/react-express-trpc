import { CreateUserInput, LoginUserInput } from "./userSchema";
import bcrypt from "bcrypt";
import { prisma } from "./prismaClient";
import { TRPCError } from "@trpc/server";
import Jwt from "jsonwebtoken";
var Cookies = require("cookies");
export const registerHandler = async ({
  input,
}: {
  input: CreateUserInput;
}) => {
  try {
    const hashedPassword = await bcrypt.hash(input.password, 12);
    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashedPassword,
      },
    });
    const { password, ...userWithoutPassword } = user;
    return {
      status: "success",
      data: {
        user: userWithoutPassword,
      },
    };
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email already exists",
      });
    }
    throw error;
  }
};

export const loginHandler = async ({ input }: { input: LoginUserInput }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid password",
      });
    }
    const secret = process.env.JWT_SECRET!;
    const token = Jwt.sign(
      {
        sub: user.id,
      },
      secret as string,
      {
        expiresIn: "1h",
      }
    );
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
      path: "/",
    };
    Cookies().set("token", token, cookieOptions);
    return {
      status: "success",
      token,
    };
  } catch (error: any) {
    throw new error();
  }
};
export const logoutHandler = async () => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    };
    Cookies().set("token", "", cookieOptions);
    return {
      status: "success",
    };
  } catch (error: any) {
    throw new error();
  }
};
