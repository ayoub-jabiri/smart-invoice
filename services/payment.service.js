import Payment from "../models/payment.schema.js";

export const getInvoicePayments = async (query) => await Payment.find(query);
