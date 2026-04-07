// External Modules
import { Router } from "express";

// Internal Modules
import { register, login } from "../controllers/user.controller.js";
import {
    userValidationRules,
    loginValidationRules,
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

userRoutes.post("/login", loginValidationRules, dataValidation, login);

export default userRoutes;
