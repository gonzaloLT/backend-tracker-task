import mongoose from "mongoose";

const schema = mongoose.Schema;

const projectSchema = new schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: false, default: "", trim: true },
        icon: { type: String, default: "📁" },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
