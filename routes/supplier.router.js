// External Modules
import { Router } from "express";

// Internal Modules
import { create, getAllSuppliers } from "../controllers/supplier.controller.js";
import {
    authenticationCheck,
    authorizationCheck,
} from "../middlewares/auth.middleware.js";
import {
    supplierValidationRules,
    dataValidation,
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

export default supplierRoutes;
