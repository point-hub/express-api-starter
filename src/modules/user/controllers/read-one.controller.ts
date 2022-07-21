import { NextFunction, Request, Response } from "express";
import { db } from "@src/database/database.js";
import { ReadOneUserService } from "@src/database/read-one.service.js";

export const readOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const readOneUserService = new ReadOneUserService(db);
    const result = await readOneUserService.handle(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
