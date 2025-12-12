import mongoose from "mongoose";

const schema = mongoose.Schema;

const taskSchema = new schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: false, default: "", trim: true },
        
        done: { 
            type: Boolean, 
            required: false,
            default: false 
        },

        story: {
            type: schema.Types.ObjectId,
            ref: "Story",
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

const Task = mongoose.model("Task", taskSchema);
export default Task;