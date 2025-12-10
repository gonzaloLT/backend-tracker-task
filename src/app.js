import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import { verifyToken } from "./middlewares/auth.middleware.js";

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



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
