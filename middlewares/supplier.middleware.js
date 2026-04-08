// External Modules
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";

// Internal Modules
import { getUser } from "../services/user.service.js";
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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return errorResponse(res, 400, "Invalid supplier ID format");

    try {
        const supplier = await getSupplier(id);

        if (!supplier) return errorResponse(res, 404, "Supplier not found!");

        next();
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};
