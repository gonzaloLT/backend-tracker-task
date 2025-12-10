import Project from "../models/project.model.js";
import Epic from "../models/epic.model.js";

// GET /api/projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user.id });

        res.status(200).json({
            message: "Proyectos obtenidos exitosamente",
            projects,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los proyectos" });
    }
};

// GET /api/projects/:id
export const getProject = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscamos por ID y también por Owner
        const project = await Project.findOne({ _id: id, owner: req.user.id });

        if (!project) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }

        res.status(200).json({
            message: "Proyecto encontrado",
            project,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el proyecto" });
    }
};

// POST /api/projects
export const createProject = async (req, res) => {
    try {
        const { title, description, icon } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "El título es obligatorio",
            });
        }

        const newProject = new Project({
            title,
            description,
            icon,
            owner: req.user.id,
        });

        const projectSaved = await newProject.save();

        res.status(201).json({
            message: "Proyecto creado exitosamente",
            project: projectSaved,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el proyecto" });
    }
};

// PUT /api/projects/:id
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;

        // new: true devuelve el dato actualizado en vez del viejo
        const projectUpdated = await Project.findOneAndUpdate(
            { _id: id, owner: req.user.id },
            req.body,
            { new: true }
        );

        if (!projectUpdated) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }

        res.status(200).json({
            message: "Proyecto actualizado",
            project: projectUpdated,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el proyecto" });
    }
};

// DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
    try {
        const { id: projectId } = req.params;

        const project = await Project.findOne({ _id: projectId, owner: req.user.id });

        if (!project) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }

        const hasEpics = await Epic.findOne({ project: projectId });

        if (hasEpics) {
            return res.status(400).json({
                message: "No se puede eliminar el proyecto porque tiene épicas asociadas.",
            });
        }

        await Project.deleteOne({ _id: projectId });

        res.status(200).json({
            message: "Proyecto eliminado exitosamente",
            project,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el proyecto" });
    }
};
