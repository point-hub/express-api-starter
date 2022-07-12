import { NextFunction, Request, Response } from "express";
import { Collection } from "mongodb";
import { UserCreateService } from "../services/create.service.js";
import { connection } from "@src/config/database.js";
import MongoDbConnection from "@src/database/connection-mongodb.js";
import DatabaseConnection from "@src/database/connection.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const db = new DatabaseConnection(
      new MongoDbConnection({
        name: "starter",
        protocol: "mongodb",
        host: "localhost:27017",
      }),
      connection
    );

    await db.open();
    const col = db.collection("user") as Collection;
    console.log(await col.find().toArray());

    const userCreateService = new UserCreateService();
    userCreateService.handle(db);

    res.status(201).json({});
    console.log("Hello");
  } catch (error) {
    next(error);
  }
};
