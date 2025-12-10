import mongoose from "mongoose";

const schema = mongoose.Schema;

const epicSchema = new schema({
        project: {
            type: schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        name: { type: String, required: true, trim: true },
        description: { type: String, required: false, default: "", trim: true },
        icon: { type: String, required: false, default: "⚡" },
    },
    {
        timestamps: true,
    }
);

const Epic = mongoose.model("Epic", epicSchema);
export default Epic;
