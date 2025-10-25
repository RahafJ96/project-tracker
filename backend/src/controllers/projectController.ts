import { Response } from "express";
import { pool } from "../utils/db";
import { AuthedRequest } from "../middleware/authMiddleware";

export async function listProjects(req: AuthedRequest, res: Response) {
  const r = await pool.query(
    "SELECT id, title, description, status, created_at, updated_at FROM projects WHERE user_id=$1 ORDER BY created_at DESC",
    [req.userId]
  );
  res.json(r.rows);
}

export async function getProjectById(req: AuthedRequest, res: Response) {
  const { id } = req.params;
  const r = await pool.query(
    `SELECT id, title, description, status, created_at, updated_at
       FROM projects
      WHERE id = $1 AND user_id = $2`,
    [id, req.userId]
  );
  if (r.rowCount === 0) return res.status(404).json({ error: "Not found" });
  res.json(r.rows[0]);
}

export async function createProject(req: AuthedRequest, res: Response) {
  const { title, description, status } = req.body || {};
  if (!title) return res.status(400).json({ error: "title required" });

  const valid = ["planning", "active", "paused", "done"];
  const statusValue = valid.includes(status) ? status : undefined;

  const r = await pool.query(
    `INSERT INTO projects(user_id, title, description, status)
     VALUES($1,$2,$3, COALESCE($4, 'planning'))
     RETURNING id, title, description, status, created_at, updated_at`,
    [req.userId, title, description ?? null, statusValue ?? null]
  );
  res.status(201).json(r.rows[0]);
}

export async function updateProject(req: AuthedRequest, res: Response) {
  const { id } = req.params;
  const { title, description, status } = req.body || {};
  const r = await pool.query(
    `UPDATE projects
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         status = COALESCE($3, status)
     WHERE id=$4 AND user_id=$5
     RETURNING id, title, description, status, created_at, updated_at`,
    [title ?? null, description ?? null, status ?? null, id, req.userId]
  );
  if (!r.rowCount) return res.status(404).json({ error: "Not found" });
  res.json(r.rows[0]);
}

export async function deleteProject(req: AuthedRequest, res: Response) {
  const { id } = req.params;
  const r = await pool.query(
    "DELETE FROM projects WHERE id=$1 AND user_id=$2",
    [id, req.userId]
  );
  if (!r.rowCount) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
}
