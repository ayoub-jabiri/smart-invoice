import Invoice from "../models/invoice.schema.js";

export const createInvoice = async (invoice) => await Invoice.create(invoice);

export const getClientInvoices = async (clientId) =>
    await Invoice.find({ clientId });

export const getInvoice = async (invoiceId) =>
    await Invoice.findById(invoiceId);

export const updateInvoice = async (invoiceId, newName) => {
    const invoice = await Invoice.findById(invoiceId);

    invoice.name = newName;

    return await invoice.save();
};

export const deleteInvoice = async (invoiceId) =>
    await Invoice.deleteOne({ _id: invoiceId });
