import { Schema, model } from "mongoose";

const invoiceSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["unpaid", "partially_paid", "paid"],
        default: "unpaid",
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    supplierId: {
        type: Schema.Types.ObjectId,
        ref: "Supplier",
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
});

export default model("Invoice", invoiceSchema);
