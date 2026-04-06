// External Modules
import { Router } from "express";

// Internal Modules
import { register, login } from "../controllers/user.controller.js";
import {
    userValidationRules,
    dataValidation,
    registerCheck,
    loginCheck,
} from "../middlewares/user.middleware.js";

const userRoutes = Router();

userRoutes.post(
    "/register",
    userValidationRules,
    dataValidation,
    registerCheck,
    register
);

userRoutes.post("/login", loginCheck, login);

export default userRoutes;
