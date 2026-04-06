import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "owner", "investor"],
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
});

export default model("User", userSchema);
