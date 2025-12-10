import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "Acceso denegado, se requiere token" });
        }

        // Se espera el formato: "Bearer <token>"
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Formato de token inválido" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};