import compression from "compression";
import cors from "cors";
import { json, urlencoded, Express } from "express";
import helmet from "helmet";
import customMiddleware from "./custom-middleware/index.js";

export default class Middleware {
  app: Express;
  constructor(app: Express) {
    this.app = app;
  }

  private baseMiddleware() {
    // Gzip compressing can greatly decrease the size of the response body
    this.app.use(compression());
    // Parse json request body
    this.app.use(json());
    // Parse urlencoded request body
    this.app.use(urlencoded({ extended: false }));
    // Set security HTTP headers
    this.app.use(helmet());
    // Cors
    this.app.use(cors());
  }

  register() {
    this.baseMiddleware();

    // Custom Middleware
    this.app.use(customMiddleware({ msg: "Helloworld" }));
  }
}
