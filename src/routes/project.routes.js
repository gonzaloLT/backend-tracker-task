import { Router } from "express";
import {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
} from "../controllers/project.controllers.js";
import { getEpicsByProject } from "../controllers/epic.controllers.js";

const router = Router();

//api/projects
router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

//Obtener epicas del proyecto
router.get("/:id/epics", getEpicsByProject);

export default router;
