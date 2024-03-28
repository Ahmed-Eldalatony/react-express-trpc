import express, { Application, NextFunction, Request, Response } from "express";
import * as trpExpress from "@trpc/server/adapters/express";
// // import { appRouter } from "./router";
import { appRouter } from "./router/trpcRouter";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createContext } from "./utils/context";
import { Role } from "@prisma/client";
const app: Application = express();
app.use(cors(), cookieParser());
// export const createCaller = t.createCallerFactory(appRouter);

// export const createAsyncCaller = async () => {
//   const context = await createContext();
//   return createCaller(context);
// };
const createContextOptions = ({
  req,
  res,
}: trpExpress.CreateExpressContextOptions) => {
  // You can customize this function to create a context object that
  // includes any data that your procedures might need, such as the current user.
  // const user = {
  //   name: "A",
  //   email: "decom",
  //   password: "1",
  //   role: Role.USER,
  //   token: "dfadf" || null,
  //   id: "1",
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   tokenExpires: new Date() || null,
  // };
  return {
    createContext: createContext,
  };
};

app.use(
  "/trpc",
  trpExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const PORT: number = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on Port: ${PORT}`);
});
