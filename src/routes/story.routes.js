import { Router } from "express";
import {
    getStories,
    createStory,
    getStory,
    updateStory,
    deleteStory,
} from "../controllers/story.controllers.js";
import { getTasksByStory } from "../controllers/task.controllers.js";

const router = Router();

//api/stories
router.get("/", getStories);
router.get("/:id", getStory);
router.post("/", createStory);
router.put("/:id", updateStory);
router.delete("/:id", deleteStory);


//Obtener tareas de una historia
router.get("/:id/tasks", getTasksByStory);

export default router;