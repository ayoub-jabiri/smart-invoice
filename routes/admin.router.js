// External Modules
import { Router } from "express";

// Internal Modules
import { clients } from "../controllers/admin.controller.js";
import {
    authenticationCheck,
    authorizationCheck,
} from "../middlewares/auth.middleware.js";

const adminRoutes = Router();

adminRoutes.use(authenticationCheck);

adminRoutes.get("/clients", authorizationCheck(["admin"]), clients);

export default adminRoutes;
