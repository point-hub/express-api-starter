import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  console.log("TEST2 AUTH");
  next();
}
