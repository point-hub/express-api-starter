import { config } from "dotenv";
import express, { Express, Request, Response } from "express";
import Middleware from "./middleware/index.js";

export function createApp() {
  const app: Express = express();

  config();

  const middleware = new Middleware(app);
  middleware.register();

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "TypeScript + Express Server",
    });
  });

  return app;
}
