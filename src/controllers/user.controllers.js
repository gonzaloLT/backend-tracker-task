import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Recibe usuario y contraseña
export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Usuario y contraseña son requeridos" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            token,
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error del servidor",
        });
    }
};


//Recibe usuario, contraseña y el objeto nombre
export const registerUser = async (req, res) => {
    try {
        const { username, password, name } = req.body;

        if (!username || !password || !name?.first || !name?.last) {
            return res.status(400).json({ message: "Faltan datos requeridos" });
        }

        const userFound = await User.findOne({ username });
        if (userFound) {
            return res.status(409).json({ message: "El nombre de usuario ya está en uso" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: passwordHash,
            name: {
                first: name.first,
                last: name.last,
            },
        });

        const userSaved = await newUser.save();

        const token = jwt.sign(
            { id: userSaved._id, username: userSaved.username },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(201).json({
            message: "Usuario creado exitosamente",
            token,
            user: {
                id: userSaved._id,
                username: userSaved.username,
                name: userSaved.name,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error del servidor" });
    }
};
