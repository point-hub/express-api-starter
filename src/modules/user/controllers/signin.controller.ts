import { NextFunction, Request, Response } from "express";
import { SigninUserService } from "../services/signin.service.js";
import { db } from "@src/database/database.js";

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("a");
    const signinUserService = new SigninUserService(db);
    const result = await signinUserService.handle(req.body.username, req.body.password);
    console.log("b");
    res.status(200).json(result);
  } catch (error) {
    console.log("c");
    next(error);
  }
};
