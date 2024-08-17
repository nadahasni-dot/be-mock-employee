import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { MESSAGE } from "../constants/message";

const JWT_SECRET = process.env.JWT_SECRET || "SECRET";

export interface CustomRequest extends Request {
  user?: User;
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.replace("Bearer ", "")
      : "";

    const decoded = jwt.verify(token, JWT_SECRET) as User;

    (req as CustomRequest).user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      code: 401,
      status: false,
      message: MESSAGE.UNAUTHORIZED,
    });
  }
};

export const isAdminOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.replace("Bearer ", "")
      : "";

    const decoded = jwt.verify(token, JWT_SECRET) as User;

    if (decoded.role !== "ADMIN") {
      return res.status(401).json({
        code: 401,
        status: false,
        message: MESSAGE.UNAUTHORIZED,
      });
    }

    (req as CustomRequest).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      code: 401,
      status: false,
      message: MESSAGE.UNAUTHORIZED,
    });
  }
};
