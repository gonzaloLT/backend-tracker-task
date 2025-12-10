import { Router } from "express";
import {
    createStory,
    getStory,
    updateStory,
    deleteStory,
} from "../controllers/story.controllers.js";

const router = Router();

//api/stories
router.post("/", createStory);
router.get("/:id", getStory);
router.put("/:id", updateStory);
router.delete("/:id", deleteStory);


//Obtener tareas de una historia

export default router;