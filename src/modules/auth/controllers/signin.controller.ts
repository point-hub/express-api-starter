import { NextFunction, Request, Response } from "express";
import { SigninUserService } from "../services/signin.service.js";
import { db } from "@src/database/database.js";

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const signinUserService = new SigninUserService(db);

    const result = await signinUserService.handle(req.body.username, req.body.password);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
