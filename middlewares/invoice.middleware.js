// External Modules
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";

// Internal Modules
import { getInvoice } from "../services/invoice.service.js";
import { errorResponse } from "../utils/error.response.js";

export const invoiceValidationRules = [
    body("amount")
        .isFloat({ min: 0.01 })
        .withMessage(
            "The invoice amount is required and must be greater than 0"
        ),
    body("supplierId")
        .notEmpty()
        .withMessage("The invoice's supplier id is required"),
];

export const paymentValidationRules = [
    body("amount")
        .isFloat({ min: 0.01 })
        .withMessage(
            "The invoice amount is required and must be greater than 0"
        ),
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

export const paymentAmountCheck = async (req, res, next) => {
    const { id } = req.params;
    const { amount } = req.body;

    try {
        const invoice = await getInvoice(id);

        // Check if the payment amount overrides the invoice amount
        if (+amount > invoice.amount)
            return errorResponse(
                res,
                400,
                `The operation cannot be done because the payment amount overrides the invoice amount, which is: '${
                    invoice.amount
                }'. Only the amount of '${
                    invoice.amount - invoice.currentAmount
                }' is needed to to fully pay this invoice`
            );

        next();
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};
