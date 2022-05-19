import { config } from "dotenv";
import express, { Express, Request, Response } from "express";

export default class App {
  app: Express = express();

  async init() {
    config();

    this.app.get("/", (req: Request, res: Response) => {
      res.send("TypeScript + Express Server");
    });

    return this.app;
  }
}
