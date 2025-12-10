import Project from "../models/project.model.js";

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

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const projectDeleted = await Project.findOneAndDelete({
            _id: id,
            owner: req.user.id,
        });

        if (!projectDeleted) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }

        res.status(200).json({
            message: "Proyecto eliminado exitosamente",
            project: projectDeleted,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el proyecto" });
    }
};
