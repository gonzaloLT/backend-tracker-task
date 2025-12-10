import Story from "../models/story.model.js";
import Epic from "../models/epic.model.js";

// GET /api/stories
export const getStories = async (req, res) => {
    try {
        const stories = await Story.find({ owner: req.user.id }).populate("epic");

        res.status(200).json({
            message: "Historias obtenidas exitosamente",
            stories,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las historias" });
    }
};

// GET /api/stories/:id
export const getStory = async (req, res) => {
    try {
        const { id: storyId } = req.params;

        const story = await Story.findOne({ _id: storyId, owner: req.user.id });

        if (!story) {
            return res.status(404).json({ message: "Historia no encontrada" });
        }

        res.status(200).json({
            message: "Historia encontrada",
            story,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la historia" });
    }
};

// GET /api/epics/:id/stories
export const getStoriesByEpic = async (req, res) => {
    try {
        const { id: epicId } = req.params;

        const epic = await Epic.findById(epicId).populate("project", "owner");

        if (!epic) {
            return res.status(404).json({ message: "Épica no encontrada" });
        }

        if (epic.project.owner.toString() !== req.user.id) {
            return res.status(404).json({ message: "Épica no encontrada o no autorizada" });
        }

        const stories = await Story.find({ epic: epicId });

        res.status(200).json({
            message: "Historias obtenidas exitosamente",
            stories,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las historias" });
    }
};

// POST /api/stories
export const createStory = async (req, res) => {
    try {
        const { name, description, status, epic } = req.body;

        if (!name || !epic) {
            return res.status(400).json({ message: "El nombre y la épica son obligatorios" });
        }

        const epicData = await Epic.findById(epic).populate("project", "owner");

        if (!epicData || epicData.project.owner.toString() !== req.user.id) {
            return res.status(404).json({ message: "Épica no válida o no autorizada" });
        }

        const newStory = new Story({
            name,
            description,
            status,
            epic,
            owner: req.user.id,
        });

        const storySaved = await newStory.save();

        res.status(201).json({
            message: "Historia creada exitosamente",
            story: storySaved,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la historia" });
    }
};

// PUT /api/stories/:id
export const updateStory = async (req, res) => {
    try {
        const { id: storyId } = req.params;

        const storyUpdated = await Story.findOneAndUpdate(
            { _id: storyId, owner: req.user.id },
            req.body,
            { new: true }
        );

        if (!storyUpdated) {
            return res.status(404).json({ message: "Historia no encontrada o no autorizada" });
        }

        res.status(200).json({
            message: "Historia actualizada exitosamente",
            story: storyUpdated,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la historia" });
    }
};

// DELETE /api/stories/:id
export const deleteStory = async (req, res) => {
    try {
        const { id: storyId } = req.params;

        const storyDeleted = await Story.findOneAndDelete({
            _id: storyId,
            owner: req.user.id,
        });

        if (!storyDeleted) {
            return res.status(404).json({ message: "Historia no encontrada o no autorizada" });
        }

        // const hasTasks = await Task.findOne({ story: storyId }); ...

        res.status(200).json({
            message: "Historia eliminada exitosamente",
            story: storyDeleted,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la historia" });
    }
};