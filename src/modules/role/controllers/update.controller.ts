import { NextFunction, Request, Response } from "express";
import { UpdateRoleService } from "../services/update.service.js";
import { db } from "@src/database/database.js";

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = db.startSession();

    db.startTransaction();

    const updateRoleService = new UpdateRoleService(db);
    await updateRoleService.handle({ _id: req.params.id }, req.body, session);

    await db.commitTransaction();

    res.status(204).json();
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};
