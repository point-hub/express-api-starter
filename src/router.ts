import express, { Express } from "express";
import userRouter from "./modules/user/router.js";
import warehouseRouter from "./modules/warehouse/router.js";

export default async function () {
  const app: Express = express();
  /**
   * Register all available modules
   * <modules>/router.ts
   */
  app.use(`/user`, userRouter);
  app.use(`/warehouse`, warehouseRouter);

  return app;
}
