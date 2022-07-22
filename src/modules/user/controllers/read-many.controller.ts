import { NextFunction, Request, Response } from "express";
import { ReadManyUserService } from "../services/read-many.service.js";
import { db } from "@src/database/database.js";

export const readMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const readManyUserService = new ReadManyUserService(db);
    const result = await readManyUserService.handle(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
