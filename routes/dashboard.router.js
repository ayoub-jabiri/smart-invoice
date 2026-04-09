// External Modules
import { Router } from "express";

// Internal Modules
import { dashboardStats } from "../controllers/dashboard.controller.js";
import {
    authenticationCheck,
    authorizationCheck,
} from "../middlewares/auth.middleware.js";

const dashboardRoutes = Router();

dashboardRoutes.get(
    "/",
    authenticationCheck,
    authorizationCheck(["client"]),
    dashboardStats
);

export default dashboardRoutes;
