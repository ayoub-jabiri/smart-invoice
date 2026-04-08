// External Modules
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";

// Internal Modules
import { getInvoice } from "../services/invoice.service.js";
import { errorResponse } from "../utils/error.response.js";

export const invoiceValidationRules = [
    body("amount")
        .isFloat({ min: 0.01 })
        .withMessage("The invoice amount is required"),
    body("supplierId")
        .notEmpty()
        .withMessage("The invoice's supplier id is required"),
];

export const dataValidation = (req, res, next) => {
    const validation = validationResult(req);

    if (!validation.isEmpty())
        return res.status(400).json({ errors: validation.errors });

    next();
};

export const invoiceExistenceCheck = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return errorResponse(res, 400, "Invalid invoice ID format");

    try {
        const invoice = await getInvoice(id);

        if (!invoice) return errorResponse(res, 404, "Invoice not found!");

        next();
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};

export const verifyOwnership = async (req, res, next) => {
    const { id } = req.params;

    try {
        const invoice = await getInvoice(id);

        if (invoice.clientId != req.user._id)
            return errorResponse(
                res,
                403,
                "You don't have the right to access or manipulate this invoice!"
            );

        next();
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};
