// Internal Modules
import {
    createInvoice,
    getClientInvoices,
    getInvoice,
    updateInvoice,
    deleteInvoice,
} from "../services/invoice.service.js";
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
    try {
        const invoice = await getClientInvoices(req.user._id);
        res.json(invoice);
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
    const { name } = req.body;
    try {
        const invoice = await updateInvoice(id, name);

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
