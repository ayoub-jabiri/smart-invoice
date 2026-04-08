// External Modules
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";

// Internal Modules
import { getSupplier } from "../services/supplier.service.js";
import { errorResponse } from "../utils/error.response.js";

export const supplierValidationRules = [
    body("name").notEmpty().withMessage("The supplier name is required"),
];

export const dataValidation = (req, res, next) => {
    const validation = validationResult(req);

    if (!validation.isEmpty())
        return res.status(400).json({ errors: validation.errors });

    next();
};

export const supplierExistenceCheck = async (req, res, next) => {
    const { baseUrl } = req;

    let supplierId = "";

    if (baseUrl.includes("suppliers")) {
        supplierId = req.params.id;
    } else if (baseUrl.includes("invoices")) {
        supplierId = req.body.supplierId;
    }
    if (!mongoose.Types.ObjectId.isValid(supplierId))
        return errorResponse(res, 400, "Invalid supplier ID format");

    try {
        const supplier = await getSupplier(supplierId);

        if (!supplier) return errorResponse(res, 404, "Supplier not found!");

        next();
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};

export const verifyOwnership = async (req, res, next) => {
    const { id } = req.params;

    try {
        const supplier = await getSupplier(id);

        if (supplier.clientId != req.user._id)
            return errorResponse(
                res,
                403,
                "You don't have the right to access or manipulate this supplier!"
            );

        next();
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};
