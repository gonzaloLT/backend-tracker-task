import { Router } from "express";
import {
    getEpic,
    createEpic,
    updateEpic,
    deleteEpic,
} from "../controllers/epic.controllers.js";

const router = Router();

//api/epics
router.get("/:id", getEpic);
router.post("/", createEpic);
router.put("/:id", updateEpic);
router.delete("/:id", deleteEpic);

// Obtener historias de usuario de una épica


export default router;