import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log(">>> Base de datos conectada exitosamente");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);

        process.exit(1);
    }
};
