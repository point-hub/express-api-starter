import { NextFunction, Request, Response } from "express";
import { RoleInterface } from "../entities/role.entity.js";
import { ReadManyRoleService } from "../services/read-many.service.js";
import { QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export interface ResponseInterface {
  roles: Array<RoleInterface>;
  pagination: {
    page: number;
    totalDocument: number;
    totalPage: number;
    totalPerPage: number;
  };
}

export const readMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const readManyRoleService = new ReadManyRoleService(db);

    const iQuery: QueryInterface = {
      fields: (req.query.field as string) ?? "",
      filter: (req.query.filter as any) ?? {},
      page: Number(req.query.page ?? 1),
      limit: Number(req.query.limit ?? 10),
      sort: (req.query.sort as string) ?? "",
    };

    const result = await readManyRoleService.handle(iQuery);

    const response: ResponseInterface = result;

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
