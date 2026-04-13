import Invoice from "../models/invoice.schema.js";
import Payment from "../models/payment.schema.js";

export const createInvoice = async (invoice) => await Invoice.create(invoice);

export const getClientInvoices = async (
    clientId,
    status,
    supplierId,
    invoicesToSkip,
    invoicesLimit
) => {
    if (supplierId) {
        return await Invoice.find({
            clientId,
            status,
            supplierId,
        })
            .skip(invoicesToSkip)
            .limit(invoicesLimit);
    } else {
        return await Invoice.find({ clientId, status })
            .skip(invoicesToSkip)
            .limit(invoicesLimit);
    }
};

export const getInvoice = async (invoiceId) =>
    await Invoice.findById(invoiceId);

export const updateInvoice = async (invoiceId, newInvoice) => {
    const invoice = await Invoice.findById(invoiceId);

    invoice.amount = newInvoice.amount;
    invoice.supplierId = newInvoice.supplierId;

    return await invoice.save();
};

export const deleteInvoice = async (invoiceId) =>
    await Invoice.deleteOne({ _id: invoiceId });

export const invoicePayment = async (invoiceId, paymentAmount) => {
    const invoice = await Invoice.findById(invoiceId);

    invoice.currentAmount += paymentAmount;

    if (invoice.amount == invoice.currentAmount) {
        invoice.status = "paid";
    } else {
        invoice.status = "partially_paid";
    }

    await invoice.save();

    const payment = await Payment.create({
        amount: paymentAmount,
        invoiceId: invoice._id,
        clientId: invoice.clientId,
        supplierId: invoice.supplierId,
    });

    return { invoice, payment };
};
