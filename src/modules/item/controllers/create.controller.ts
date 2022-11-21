import { NextFunction, Request, Response } from "express";
import { CreateItemService } from "../services/create.service.js";
import { db } from "@src/database/database.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = db.startSession();

    db.startTransaction();

    const createItemService = new CreateItemService(db);
    const result = await createItemService.handle(req.body, session);

    await db.commitTransaction();

    res.status(201).json({
      _id: result._id,
    });
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};
