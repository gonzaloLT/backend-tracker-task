import Task from "../models/task.model.js";
import Story from "../models/story.model.js";

// GET /api/tasks/:id
export const getTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;

        const task = await Task.findOne({ _id: taskId, owner: req.user.id });

        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        res.status(200).json({ message: "Tarea encontrada", task });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la tarea" });
    }
};

// GET /api/stories/:id/tasks
export const getTasksByStory = async (req, res) => {
    try {
        const { id: storyId } = req.params;

        const story = await Story.findOne({ _id: storyId, owner: req.user.id });

        if (!story) {
            return res.status(404).json({ message: "Historia no encontrada o no autorizada" });
        }

        const tasks = await Task.find({ story: storyId });

        res.status(200).json({
            message: "Tareas obtenidas exitosamente",
            tasks,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las tareas" });
    }
};

// POST /api/tasks
export const createTask = async (req, res) => {
    try {
        const { name, description, story } = req.body;

        if (!name || !story) {
            return res.status(400).json({ message: "El nombre y la historia son obligatorios" });
        }

        const storyData = await Story.findOne({
            _id: story,
            owner: req.user.id,
        });

        if (!storyData) {
            return res.status(404).json({ message: "Historia no válida o no autorizada" });
        }

        const newTask = new Task({
            name,
            description,
            story,
            owner: req.user.id,
        });

        const taskSaved = await newTask.save();

        res.status(201).json({
            message: "Tarea creada exitosamente",
            task: taskSaved,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la tarea" });
    }
};

// PUT /api/tasks/:id
export const updateTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;

        const taskUpdated = await Task.findOneAndUpdate(
            { _id: taskId, owner: req.user.id },
            req.body,
            { new: true }
        );

        if (!taskUpdated) {
            return res.status(404).json({ message: "Tarea no encontrada o no autorizada" });
        }

        res.status(200).json({
            message: "Tarea actualizada exitosamente",
            task: taskUpdated,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la tarea" });
    }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;

        const taskDeleted = await Task.findOneAndDelete({
            _id: taskId,
            owner: req.user.id,
        });

        if (!taskDeleted) {
            return res.status(404).json({ message: "Tarea no encontrada o no autorizada" });
        }

        res.status(200).json({
            message: "Tarea eliminada exitosamente",
            task: taskDeleted,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la tarea" });
    }
};


