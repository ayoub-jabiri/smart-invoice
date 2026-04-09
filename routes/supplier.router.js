// External Modules
import { Router } from "express";

// Internal Modules
import {
    create,
    getAllSuppliers,
    getSingleSupplier,
    update,
    deleteSp,
    supplierStats,
} from "../controllers/supplier.controller.js";
import {
    authenticationCheck,
    authorizationCheck,
} from "../middlewares/auth.middleware.js";
import {
    supplierValidationRules,
    dataValidation,
    supplierExistenceCheck,
    verifyOwnership,
} from "../middlewares/supplier.middleware.js";

const supplierRoutes = Router();

supplierRoutes.use(authenticationCheck);

supplierRoutes.post(
    "/",
    authorizationCheck(["client"]),
    supplierValidationRules,
    dataValidation,
    create
);

supplierRoutes.get("/", authorizationCheck(["client"]), getAllSuppliers);

supplierRoutes.get(
    "/:id",
    authorizationCheck(["client"]),
    supplierExistenceCheck,
    verifyOwnership,
    getSingleSupplier
);

supplierRoutes.put(
    "/:id",
    authorizationCheck(["client"]),
    supplierExistenceCheck,
    verifyOwnership,
    supplierValidationRules,
    dataValidation,
    update
);

supplierRoutes.delete(
    "/:id",
    authorizationCheck(["client"]),
    supplierExistenceCheck,
    verifyOwnership,
    deleteSp
);

supplierRoutes.get(
    "/:id/stats",
    authorizationCheck(["client"]),
    supplierExistenceCheck,
    verifyOwnership,
    supplierStats
);

export default supplierRoutes;
