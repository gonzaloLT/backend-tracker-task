import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import epicRoutes from "./routes/epic.routes.js";
import storyRoutes from "./routes/story.routes.js";
import taskRoutes from "./routes/task.routes.js";

import { verifyToken } from "./middlewares/auth.middlewares.js";

dotenv.config();


const PORT = process.env.PORT || 8000;
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use("/api/users", userRoutes);
app.use("/api/projects", verifyToken, projectRoutes);
app.use("/api/epics", verifyToken,  epicRoutes);
app.use("/api/stories", verifyToken, storyRoutes);
app.use("/api/tasks", verifyToken, taskRoutes);



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
