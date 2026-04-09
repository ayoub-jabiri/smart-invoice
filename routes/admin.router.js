// External Modules
import { Router } from "express";

// Internal Modules
import { clients, clientInfo } from "../controllers/admin.controller.js";
import {
    authenticationCheck,
    authorizationCheck,
} from "../middlewares/auth.middleware.js";

const adminRoutes = Router();

adminRoutes.use(authenticationCheck);

adminRoutes.get("/clients", authorizationCheck(["admin"]), clients);

adminRoutes.get(
    "/clients/:id/suppliers",
    authorizationCheck(["admin"]),
    clientInfo
);

adminRoutes.get(
    "/clients/:id/invoices",
    authorizationCheck(["admin"]),
    clientInfo
);

adminRoutes.get(
    "/clients/:id/payments",
    authorizationCheck(["admin"]),
    clientInfo
);

export default adminRoutes;
