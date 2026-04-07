import { Schema, model } from "mongoose";

const supplierSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
});

export default model("Supplier", supplierSchema);
