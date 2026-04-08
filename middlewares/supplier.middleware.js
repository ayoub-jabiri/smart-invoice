// External Modules
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

// Internal Modules
import { getUser } from "../services/user.service.js";
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
