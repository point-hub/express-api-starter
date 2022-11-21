import { NextFunction, Request, Response } from "express";
import { ReadCustomerService } from "../services/read.service.js";
import { db } from "@src/database/database.js";

export const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const readCustomerService = new ReadCustomerService(db);

    const result = await readCustomerService.handle(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
