import express, { Express } from "express";
import Middleware from "@src/middleware/index.js";
import router from "@src/router.js";

export async function createApp() {
  const app: Express = express();

  const middleware = new Middleware(app);
  middleware.registerBeforeRoutes();

  app.use("/v1", await router());

  middleware.registerAfterRoutes();

  return app;
}
