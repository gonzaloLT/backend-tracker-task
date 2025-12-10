import { Router } from "express";
import {
    createTask,
    getTask,
    updateTask,
    deleteTask,
} from "../controllers/task.controllers.js";

const router = Router();

// api/tasks
router.get("/:id", getTask);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;