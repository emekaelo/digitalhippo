// File for self-hosting nextjs app

import express from "express";
import { nextApp, nextHandler } from "./next-utils";
// import { getPayloadClient } from "./get-payload";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "@/src/trpc";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });

const start = async () => {
  // const payload = await getPayloadClient({
  //   initOptions: {
  //     express: app,
  //     onInit: async (cms) => {
  //       cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
  //     },
  //   },
  // });

  // trpc middleware which handles api requests forwarded from express
  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    // payload?.logger.info("Next.js started");
    console.log("Next.js started");

    app.listen(PORT, async () => {
      console.log(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
      // payload?.logger.info(
      //   `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`,
      // );
    });
  });
};

start();
// TODO: remove tsconfig.server.json, server.ts, get-payload.ts,nodemon.json
// TODO: remove .idea from git
