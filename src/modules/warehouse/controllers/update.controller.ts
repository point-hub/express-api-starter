import { NextFunction, Request, Response } from "express";
import { UpdateWarehouseService } from "../services/update.service.js";
import { db } from "@src/database/database.js";

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = db.startSession();

    db.startTransaction();

    const updateWarehouseService = new UpdateWarehouseService(db);
    const result = await updateWarehouseService.handle({ _id: req.params.id }, req.body, session);

    await db.commitTransaction();

    res.status(200).json(result);
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};
