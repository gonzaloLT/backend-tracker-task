import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controllers.js";

const router = Router();

//api/users
router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
