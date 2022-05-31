import express, { Express, Request, Response } from "express";
import Middleware from "@src/middleware/index.js";

export function createApp() {
  const app: Express = express();

  const middleware = new Middleware(app);
  middleware.register();

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "TypeScript + Express Server",
    });
  });

  middleware.registerErrorHandler();

  return app;
}
