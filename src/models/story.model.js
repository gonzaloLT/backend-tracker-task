import mongoose from "mongoose";

const schema = mongoose.Schema;

const storySchema = new schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: false, default: "", trim: true },
        
        status: {
            type: String,
            enum: ["Pendiente", "En progreso", "Completado"],
            required: false,
            default: "Pendiente",
        },

        epic: {
            type: schema.Types.ObjectId,
            ref: "Epic",
            required: true,
        },

        owner: { 
            type: schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
    },
    {
        timestamps: true,
    }
);

const Story = mongoose.model("Story", storySchema);
export default Story;