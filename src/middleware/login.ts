import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function required(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = verify(token, process.env.JWT_KEY);

    res.locals.user = decode;

    next();
  } catch (error) {
    return res.status(401).send({ message: "Authentication Fails" });
  }
}

export function optional(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = verify(token, process.env.JWT_KEY);

    res.locals.user = decode;

    next();
  } catch (error) {
    next();
  }
}
