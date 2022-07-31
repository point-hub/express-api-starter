import { NextFunction, Request, Response } from "express";
import { ReadUserService } from "../services/read.service.js";
import { db } from "@src/database/database.js";

export const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const readUserService = new ReadUserService(db);

    const result = await readUserService.handle(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
