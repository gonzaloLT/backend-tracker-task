import Epic from "../models/epic.model.js";
import Project from "../models/project.model.js";

// GET /api/epics/:id
export const getEpic = async (req, res) => {
    try {
        const { id: epicId } = req.params;

        // Se utiliza populate para obtener el owner del proyecto asociado y validar permisos
        const epic = await Epic.findById(epicId).populate("project", "owner");

        if (!epic) {
            return res.status(404).json({ message: "Épica no encontrada o no autorizada" });
        }

        if (epic.project.owner.toString() !== req.user.id) {
            return res.status(404).json({ message: "Épica no encontrada o no autorizada" });
        }

        res.status(200).json({
            message: "Épica encontrada",
            epic,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la épica" });
    }
};

// GET /api/projects/:id/epics
export const getEpicsByProject = async (req, res) => {
    try {
        const { id: projectId } = req.params;

        // Verificar existencia del proyecto y permisos del usuario
        const project = await Project.findOne({ _id: projectId, owner: req.user.id });

        if (!project) {
            return res.status(404).json({ message: "Proyecto no encontrado o no autorizado" });
        }

        const epics = await Epic.find({ project: projectId });

        res.status(200).json({
            message: "Épicas obtenidas exitosamente",
            epics,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las épicas del proyecto" });
    }
};

// POST /api/epics
export const createEpic = async (req, res) => {
    try {
        const { name, description, icon, project } = req.body;

        if (!name || !project) {
            return res.status(400).json({ message: "El nombre y el proyecto son obligatorios" });
        }

        // Validar que el proyecto padre pertenezca al usuario autenticado
        const projectData = await Project.findOne({ _id: project, owner: req.user.id });

        if (!projectData) {
            return res.status(404).json({ message: "Proyecto no válido o no autorizado" });
        }

        const newEpic = new Epic({
            name,
            description,
            icon,
            project,
        });

        const epicSaved = await newEpic.save();

        res.status(201).json({
            message: "Épica creada exitosamente",
            epic: epicSaved,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la épica" });
    }
};

// PUT /api/epics/:id
export const updateEpic = async (req, res) => {
    try {
        const { id: epicId } = req.params;

        // Verificar propiedad antes de ejecutar la actualización
        const epic = await Epic.findById(epicId).populate("project", "owner");

        if (!epic || epic.project.owner.toString() !== req.user.id) {
            return res.status(404).json({ message: "Épica no encontrada o no autorizada" });
        }

        const epicUpdated = await Epic.findByIdAndUpdate(epicId, req.body, { new: true });

        res.status(200).json({
            message: "Épica actualizada exitosamente",
            epic: epicUpdated,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la épica" });
    }
};

// DELETE /api/epics/:id
export const deleteEpic = async (req, res) => {
    try {
        const { id: epicId } = req.params;

        const epic = await Epic.findById(epicId).populate("project", "owner");

        if (!epic || epic.project.owner.toString() !== req.user.id) {
            return res.status(404).json({ message: "Épica no encontrada o no autorizada" });
        }

        await Epic.findByIdAndDelete(epicId);

        res.status(200).json({
            message: "Épica eliminada exitosamente",
            epic,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la épica" });
    }
};