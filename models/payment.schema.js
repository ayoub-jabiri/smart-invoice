import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    invoiceId: {
        type: Schema.Types.ObjectId,
        ref: "Invoice",
        required: true,
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
    paymentDate: {
        type: Date,
        default: () => Date.now(),
    },
});

export default model("Payment", paymentSchema);
