import { Router } from "express";
import { auth } from "../middleware/authMiddleware";
import { createProject, deleteProject, listProjects, updateProject } from "../controllers/projectController";

export const projectRouter = Router();

projectRouter.use(auth);
projectRouter.get("/", listProjects);
projectRouter.post("/", createProject);
projectRouter.put("/:id", updateProject);
projectRouter.delete("/:id", deleteProject);
