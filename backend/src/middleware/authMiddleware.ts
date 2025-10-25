import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "../utils/env";

export interface AuthedRequest extends Request {
  userId?: number;
}

// Put the user id in the standard JWT "sub" claim:
export function sign(userId: number) {
  // empty payload {}, subject in options
  return jwt.sign({}, ENV.JWT_SECRET, {
    subject: String(userId),
    expiresIn: "7d",
  });
}

export function auth(req: AuthedRequest, res: Response, next: NextFunction) {
  const h = req.headers.authorization ?? "";
  if (!h.startsWith("Bearer "))
    return res.status(401).json({ error: "Missing token" });

  try {
    const decoded = jwt.verify(h.slice(7), ENV.JWT_SECRET) as
      | JwtPayload
      | string;

    // Ensure we have an object with "sub"
    if (typeof decoded === "string" || !decoded?.sub) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // sub is string per spec; convert to number
    const uid = Number(decoded.sub);
    if (Number.isNaN(uid))
      return res.status(401).json({ error: "Invalid token subject" });

    req.userId = uid;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
