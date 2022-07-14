import { NextFunction, Request, Response } from "express";
import { connection } from "@src/config/database.js";
import MongoDbConnection from "@src/database/connection-mongodb.js";
import DatabaseConnection from "@src/database/connection.js";
import { CreateUserService } from "@src/database/create.service.js";
import { db } from "@src/database/database.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await db.open();
    // const a = await db.collection("asd123").create({ username: "gg1" });
    // await db.database("cc").collection("asd123").create({ username: "gg2" });
    // await db.collection("asd123").create({ username: "gg3" });
    // console.log(a);

    CreateUserService.handle(db);
    // user.create({ username: "kreo" });

    // db.collection("user").create({ username: "tes" });
    // const col = db.collection("user") as Collection;
    // console.log(await col.find().toArray());

    // const userCreateService = new UserCreateService();
    // userCreateService.handle(db);

    res.status(201).json({});
    console.log("Hello");
  } catch (error) {
    next(error);
  }
};
