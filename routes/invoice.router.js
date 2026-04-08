// External Modules
import { Router } from "express";

// Internal Modules
import {
    create,
    getAllInvoices,
    getSingleInvoice,
    update,
    deleteIn,
    payment,
} from "../controllers/invoice.controller.js";
import {
    authenticationCheck,
    authorizationCheck,
} from "../middlewares/auth.middleware.js";
import {
    invoiceValidationRules,
    paymentValidationRules,
    dataValidation,
    invoiceExistenceCheck,
    verifyOwnership,
    paymentAmountCheck,
} from "../middlewares/invoice.middleware.js";
import { supplierExistenceCheck } from "../middlewares/supplier.middleware.js";

const invoiceRoutes = Router();

invoiceRoutes.use(authenticationCheck);

invoiceRoutes.post(
    "/",
    authorizationCheck(["client"]),
    invoiceValidationRules,
    dataValidation,
    supplierExistenceCheck,
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
    supplierExistenceCheck,
    update
);

invoiceRoutes.delete(
    "/:id",
    authorizationCheck(["client"]),
    invoiceExistenceCheck,
    verifyOwnership,
    deleteIn
);

invoiceRoutes.post(
    "/:id/payments",
    authorizationCheck(["client"]),
    invoiceExistenceCheck,
    verifyOwnership,
    paymentValidationRules,
    dataValidation,
    paymentAmountCheck,
    payment
);

export default invoiceRoutes;
