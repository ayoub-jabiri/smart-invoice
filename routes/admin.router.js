// External Modules
import { Router } from "express";

// Internal Modules
import { clients, clientInfo } from "../controllers/admin.controller.js";
import { clientExistenceCheck } from "../middlewares/user.middleware.js";
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
    clientExistenceCheck,
    clientInfo
);

adminRoutes.get(
    "/clients/:id/invoices",
    authorizationCheck(["admin"]),
    clientExistenceCheck,
    clientInfo
);

adminRoutes.get(
    "/clients/:id/payments",
    authorizationCheck(["admin"]),
    clientExistenceCheck,
    clientInfo
);

export default adminRoutes;
