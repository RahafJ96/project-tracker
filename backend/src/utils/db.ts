import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString,
  max: 5,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false } // Render managed PG
      : undefined,
});

pool.query("select 1").then(
  () =>
    console.log(
      "✅ DB check passed (SSL:",
      !!(process.env.NODE_ENV === "production"),
      ")"
    ),
  (e) => console.error("⚠️ DB check failed:", e.message)
);
