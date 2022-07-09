import { fileSearch } from "@point-hub/express-utils";
import express, { Express } from "express";

export default async function () {
  const app: Express = express();
  /**
   * Register all available modules
   * <modules>/router.ts
   */
  const routes = await fileSearch("router.ts", "./src/modules", { maxDeep: 1 });
  routes.forEach(async (el) => {
    const { default: router } = await import(`./modules/${el.key}/router.js`);
    app.use(`/${el.key}`, router);
  });

  return app;
}
