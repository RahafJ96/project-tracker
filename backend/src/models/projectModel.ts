import { pool } from "../utils/db";

export const findAllByUser = async (userId: string) => {
  const { rows } = await pool.query(
    "SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return rows;
};

export const create = async (userId: string, title: string, description: string) => {
  const { rows } = await pool.query(
    "INSERT INTO projects (user_id, title, description) VALUES ($1, $2, $3) RETURNING *",
    [userId, title, description]
  );
  return rows[0];
};
