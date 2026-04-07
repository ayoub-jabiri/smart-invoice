// External Modules
import { Router } from "express";

// Internal Modules
import { register, login, profile } from "../controllers/user.controller.js";
import {
    userValidationRules,
    loginValidationRules,
    dataValidation,
    registerCheck,
    loginCheck,
} from "../middlewares/user.middleware.js";
import {
    authenticationCheck,
    authorizationCheck,
} from "../middlewares/auth.middleware.js";

const userRoutes = Router();

userRoutes.post(
    "/register",
    userValidationRules,
    dataValidation,
    registerCheck,
    register
);

userRoutes.post(
    "/login",
    loginValidationRules,
    dataValidation,
    loginCheck,
    login
);

userRoutes.post(
    "/me",
    authenticationCheck,
    authorizationCheck(["admin", "client"]),
    profile
);

export default userRoutes;
