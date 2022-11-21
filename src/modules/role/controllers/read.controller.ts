import { NextFunction, Request, Response } from "express";
import { ReadRoleService } from "../services/read.service.js";
import { db } from "@src/database/database.js";

export const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const readRoleService = new ReadRoleService(db);

    const result = await readRoleService.handle(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
