import { NextFunction, Request, Response } from "express";
import { RoleInterface } from "../entities/role.entity.js";
import { ReadRoleService } from "../services/read.service.js";
import { db } from "@src/database/database.js";

export const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const readRoleService = new ReadRoleService(db);

    const result = (await readRoleService.handle(req.params.id)) as RoleInterface;

    res.status(200).json({
      _id: result._id,
      name: result.name,
    });
  } catch (error) {
    next(error);
  }
};
