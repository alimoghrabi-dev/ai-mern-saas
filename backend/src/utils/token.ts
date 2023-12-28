import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
import console from "console";

interface createTokenProps {
  id: string;
  email: string;
}

export const createToken = ({ id, email }: createTokenProps) => {
  const payload = { id, email };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];

  if (!token || token.trim() === "") {
    return res.status(401).send("Unauthorized");
  }

  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        reject(err.message);
        return res.status(401).send("Unauthorized");
      } else {
        console.log("token verified");
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};
