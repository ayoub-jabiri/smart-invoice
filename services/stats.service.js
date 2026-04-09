// External Modules
import mongoose from "mongoose";

// Internal Modules
import Invoice from "../models/invoice.schema.js";
import Payment from "../models/payment.schema.js";

export const getSupplierStats = async (supplierId) => {
    const invoices = await Invoice.find({ supplierId });

    const data = await Payment.aggregate([
        {
            $match: { supplierId: new mongoose.Types.ObjectId(supplierId) },
        },
        {
            $group: {
                _id: null,
                amounts: { $sum: "$amount" },
            },
        },
    ]);

    const amounts = data.length ? data[0].amounts : 0;

    return { amounts, invoices };
};
