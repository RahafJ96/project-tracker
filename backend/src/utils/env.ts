import "dotenv/config";

export const ENV = {
  PORT: Number(process.env.PORT) || 5000,
  JWT_SECRET: process.env.JWT_SECRET || "default_secret",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://project_tracker_db_5esk_user:axUSda38Tp4ELuOWgSY7tAXamzBbSeQY@dpg-d3uivtbe5dus739ntme0-a.oregon-postgres.render.com/project_tracker_db_5esk",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
};
