import { config } from "dotenv";
import express, { Express, Request, Response } from "express";

export function createApp() {
  const app: Express = express();

  config();

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "TypeScript + Express Server",
    });
  });

  return app;
}
