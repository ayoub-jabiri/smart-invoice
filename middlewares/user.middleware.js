// External Modules
import { body, validationResult } from "express-validator";

// Internal Modules
import { getUser } from "../services/user.service.js";
import { errorResponse } from "../utils/error.response.js";

export const userValidationRules = [
    body("name").notEmpty().withMessage("The name is required"),
    body("email").isEmail().withMessage("The email must be a valide email"),
    body("password").notEmpty().withMessage("The password is required"),
    body("passwordConfirm").custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error("Password confirm is not correct");
        }
        return true;
    }),
    body("role")
        .isIn(["admin", "client"])
        .withMessage(
            "The role is required and must be either 'admin' or 'client'"
        ),
];

export const loginValidationRules = [
    body("email").isEmail().withMessage("The email must be a valide email"),
    body("password").notEmpty().withMessage("The password is required"),
];

export const dataValidation = (req, res, next) => {
    const validation = validationResult(req);

    if (!validation.isEmpty())
        return res.status(400).json({ errors: validation.errors });

    next();
};

export const registerCheck = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await getUser({ email });

        // Check if the email is already exists
        if (user)
            return errorResponse(res, 400, "The email is already exists!");

        next();
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error");
    }
};
