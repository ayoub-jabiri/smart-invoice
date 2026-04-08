// External Modules
import { Router } from "express";

// Internal Modules
import {
    create,
    getAllSuppliers,
    getSingleSupplier,
} from "../controllers/supplier.controller.js";
import {
    authenticationCheck,
    authorizationCheck,
} from "../middlewares/auth.middleware.js";
import {
    supplierValidationRules,
    dataValidation,
    supplierExistenceCheck,
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
    getSingleSupplier
);

export default supplierRoutes;
