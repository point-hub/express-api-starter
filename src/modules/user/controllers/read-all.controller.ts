import { NextFunction, Request, Response } from "express";
import { db } from "@src/database/database.js";
import { ReadAllUserService } from "@src/database/read-all.service.js";

export const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const readAllUserService = new ReadAllUserService(db);
    const result = await readAllUserService.handle();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
