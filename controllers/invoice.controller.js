// Internal Modules
import {
    createInvoice,
    getClientInvoices,
    getInvoice,
    updateInvoice,
    deleteInvoice,
    invoicePayment,
} from "../services/invoice.service.js";
import { getInvoicePayments } from "../services/payment.service.js";
import { errorResponse } from "../utils/error.response.js";

export const create = async (req, res) => {
    const { amount, supplierId } = req.body;
    try {
        const invoice = await createInvoice({
            amount,
            supplierId,
            clientId: req.user._id,
        });

        res.status(201).json(invoice);
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};

export const getAllInvoices = async (req, res) => {
    // Filter Options
    const status = req.query.status || undefined;

    // Pagination Options
    const currentPage = +req.query.page || 1;
    const invoicesLimit = +req.query.limit || 15;
    const invoicesToSkip = (currentPage - 1) * invoicesLimit;

    try {
        const invoice = await getClientInvoices(
            req.user._id,
            status,
            invoicesToSkip,
            invoicesLimit
        );

        res.json({
            currentPage,
            invoicesLimit,
            invoice,
        });
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};

export const getSingleInvoice = async (req, res) => {
    const { id } = req.params;
    try {
        const invoice = await getInvoice(id);
        res.json(invoice);
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};

export const update = async (req, res) => {
    const { id } = req.params;
    const { amount, supplierId } = req.body;
    try {
        const invoice = await updateInvoice(id, { amount, supplierId });

        res.json(invoice);
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};

export const deleteIn = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteInvoice(id);

        res.json({
            message: "The invoice has been deleted successfully",
        });
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};

export const payment = async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;
    try {
        const data = await invoicePayment(id, amount);

        res.json({
            message: "The invoice payment operation has been done successfully",
            data,
        });
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};

export const getPayment = async (req, res) => {
    const { id } = req.params;
    try {
        const payments = await getInvoicePayments({ invoiceId: id });

        res.json({
            payments,
        });
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};
