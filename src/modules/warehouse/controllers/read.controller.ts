import { NextFunction, Request, Response } from "express";
import { ReadWarehouseService } from "../services/read.service.js";
import { db } from "@src/database/database.js";

export const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const readWarehouseService = new ReadWarehouseService(db);

    const result = await readWarehouseService.handle(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
