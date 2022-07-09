import { BaseServer } from "@point-hub/papi";
import { Express } from "express";

export class Server extends BaseServer {
  constructor(app: Express) {
    super(app);
  }
}
