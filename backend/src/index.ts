import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ENV } from "./utils/env";
import { authRouter } from "./routes/authRoutes";
import { projectRouter } from "./routes/projectRoutes";
import pg from "pg";
import dotenv from "dotenv";

const app = express();

app.use(cors({ origin: ENV.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(morgan("dev"));

dotenv.config();

// Database connection
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Routes
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/auth", authRouter);
app.use("/projects", projectRouter);

app.get("/health", (_req, res) => {
  res.status(200).send("API is running 🚀");
});

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server listening on ${PORT}`);
});

export default app;
