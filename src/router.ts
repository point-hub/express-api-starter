import express, { Express } from "express";
import authRouter from "./modules/auth/router.js";
import customerRouter from "./modules/customer/router.js";
import expeditionRouter from "./modules/expedition/router.js";
import itemRouter from "./modules/item/router.js";
import roleRouter from "./modules/role/router.js";
import userRouter from "./modules/user/router.js";
import warehouseRouter from "./modules/warehouse/router.js";

export default async function () {
  const app: Express = express();
  /**
   * Register all available modules
   * <modules>/router.ts
   */
  app.use(`/role`, roleRouter);
  app.use(`/user`, userRouter);
  app.use(`/auth`, authRouter);
  app.use(`/warehouse`, warehouseRouter);
  app.use(`/customer`, customerRouter);
  app.use(`/expedition`, expeditionRouter);
  app.use(`/item`, itemRouter);

  return app;
}
