import { NextFunction, Request, Response } from "express";
import { ReadManyExpeditionService } from "../services/read-many.service.js";
import { IQuery } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export const readMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const readManyExpeditionService = new ReadManyExpeditionService(db);

    const iQuery: IQuery = {
      fields: (req.query.field as string) ?? "",
      filter: (req.query.filter as any) ?? {},
      page: Number(req.query.page ?? 1),
      limit: Number(req.query.limit ?? 10),
      sort: (req.query.sort as string) ?? "",
    };

    const result = await readManyExpeditionService.handle(iQuery);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};