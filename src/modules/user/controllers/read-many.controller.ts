import { NextFunction, Request, Response } from "express";
import { ReadManyUserService } from "../services/read-many.service.js";
import { IQuery } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export const readMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const readManyUserService = new ReadManyUserService(db);

    const iQuery: IQuery = {
      fields: req.body.field ?? "",
      filter: req.body.filter ?? {},
      page: req.body.page ?? 1,
      limit: req.body.limit ?? 10,
      sort: req.body.sort ?? "",
    };

    const result = await readManyUserService.handle(iQuery);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
