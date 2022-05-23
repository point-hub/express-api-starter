import { Request, Response, NextFunction } from "express";

export default function customMiddleware<T>(options?: T) {
  return function (req: Request, res: Response, next: NextFunction) {
    // Implement the middleware function based on the options object
    console.log(options);
    next();
  };
}
