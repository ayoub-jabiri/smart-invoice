// External Modules
import { Router } from "express";

// Internal Modules
import {
    create,
    getAllInvoices,
    getSingleInvoice,
    update,
    deleteSp,
} from "../controllers/invoice.controller.js";
import {
    authenticationCheck,
    authorizationCheck,
} from "../middlewares/auth.middleware.js";
import {
    invoiceValidationRules,
    dataValidation,
    invoiceExistenceCheck,
    verifyOwnership,
} from "../middlewares/invoice.middleware.js";

const invoiceRoutes = Router();

invoiceRoutes.use(authenticationCheck);

invoiceRoutes.post(
    "/",
    authorizationCheck(["client"]),
    invoiceValidationRules,
    dataValidation,
    create
);

invoiceRoutes.get("/", authorizationCheck(["client"]), getAllInvoices);

invoiceRoutes.get(
    "/:id",
    authorizationCheck(["client"]),
    invoiceExistenceCheck,
    verifyOwnership,
    getSingleInvoice
);

invoiceRoutes.put(
    "/:id",
    authorizationCheck(["client"]),
    invoiceExistenceCheck,
    verifyOwnership,
    invoiceValidationRules,
    dataValidation,
    update
);

invoiceRoutes.delete(
    "/:id",
    authorizationCheck(["client"]),
    invoiceExistenceCheck,
    verifyOwnership,
    deleteSp
);

export default invoiceRoutes;
