import { pool } from "../utils/db";

export const create = async (email: string, passwordHash: string) => {
  const { rows } = await pool.query(
    "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *",
    [email, passwordHash]
  );
  return rows[0];
};

export const findByEmail = async (email: string) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};
