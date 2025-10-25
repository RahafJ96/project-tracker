import { Request, Response } from "express";
import { pool } from "../utils/db";
import bcrypt from "bcrypt";
import { sign } from "../middleware/authMiddleware";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "email and password required" });

  const exists = await pool.query("SELECT id FROM users WHERE email=$1", [email]);
  if (exists.rowCount) return res.status(409).json({ error: "Email already registered" });

  const hash = await bcrypt.hash(password, 10);
  const ins = await pool.query(
    "INSERT INTO users(email, password_hash) VALUES($1,$2) RETURNING id",
    [email, hash]
  );
  return res.json({ token: sign(ins.rows[0].id) });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "email and password required" });

  const q = await pool.query("SELECT id, password_hash FROM users WHERE email=$1", [email]);
  if (!q.rowCount) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, q.rows[0].password_hash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  return res.json({ token: sign(q.rows[0].id) });
}
