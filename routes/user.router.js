// External Modules
import { Router } from "express";

// Internal Modules
import { register } from "../controllers/user.controller.js";
import {
    userValidationRules,
    dataValidation,
    registerCheck,
} from "../middlewares/user.middleware.js";

const userRoutes = Router();

userRoutes.post(
    "/register",
    userValidationRules,
    dataValidation,
    registerCheck,
    register
);

export default userRoutes;
