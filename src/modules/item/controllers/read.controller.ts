import { NextFunction, Request, Response } from "express";
import { ReadItemService } from "../services/read.service.js";
import { db } from "@src/database/database.js";

export const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const readItemService = new ReadItemService(db);

    const result = await readItemService.handle(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
