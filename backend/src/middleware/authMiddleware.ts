import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "../utils/env";

export interface AuthedRequest extends Request {
  userId?: string;
}

export function sign(userId: string) {
  return jwt.sign({}, ENV.JWT_SECRET, { subject: userId, expiresIn: "7d" });
}

export function auth(req: AuthedRequest, res: Response, next: NextFunction) {
  const h = req.headers.authorization ?? "";
  if (!h.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    const decoded = jwt.verify(h.slice(7), ENV.JWT_SECRET) as
      | JwtPayload
      | string;

    if (
      typeof decoded === "string" ||
      typeof decoded.sub !== "string" ||
      !decoded.sub
    ) {
      return res.status(401).json({ error: "Invalid token subject" });
    }

    req.userId = decoded.sub; // <-- no Number(...)
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
