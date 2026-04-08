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
    getPayment,
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
    invoiceUpdateCheck,
    invoiceDeleteCheck,
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
    invoiceUpdateCheck,
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
    invoiceDeleteCheck,
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

invoiceRoutes.get(
    "/:id/payments",
    authorizationCheck(["client"]),
    invoiceExistenceCheck,
    verifyOwnership,
    getPayment
);

export default invoiceRoutes;
