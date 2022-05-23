import { Express } from "express";
import customMiddleware from "./custom-middleware/index.js";

export default class Middleware {
  app: Express;
  constructor(app: Express) {
    this.app = app;
  }

  register() {
    this.app.use(customMiddleware({ msg: "Helloworld" }));
  }
}
