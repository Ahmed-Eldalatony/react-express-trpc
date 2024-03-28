import express from "express";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router/trpcRouter";
import { createContext } from "./utils/context";
const router = express.Router();

router.use("/trpc/:trpc", (req, res) => {
  const trpc = req.params.trpc;
  return trpc;
  // Do something with userId
});
export const handler = (request: Request) => {
  console.log(`incoming request: ${request.method}`);
  return fetchRequestHandler({
    endpoint: "/trpc",
    req: request,
    router: appRouter,
    createContext,
  });
};
export default router;
