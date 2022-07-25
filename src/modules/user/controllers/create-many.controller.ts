import { NextFunction, Request, Response } from "express";
import { CreateManyUserService } from "../services/create-many.service.js";
import { db } from "@src/database/database.js";

export const createMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = db.startSession();

    db.startTransaction();

    const createUserService = new CreateManyUserService(db);
    const result = await createUserService.handle(req.body, session);

    await db.commitTransaction();

    res.status(201).json(result);
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};
