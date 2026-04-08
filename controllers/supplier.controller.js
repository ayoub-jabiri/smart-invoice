// Internal Modules
import {
    createSupplier,
    getClientSuppliers,
    getSupplier,
    updateSupplier,
} from "../services/supplier.service.js";
import { errorResponse } from "../utils/error.response.js";

export const create = async (req, res) => {
    const { name } = req.body;
    try {
        const supplier = await createSupplier({
            name,
            clientId: req.user._id,
        });

        res.status(201).json(supplier);
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};

export const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await getClientSuppliers(req.user._id);
        res.json(suppliers);
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};

export const getSingleSupplier = async (req, res) => {
    const { id } = req.params;
    try {
        const supplier = await getSupplier(id);
        res.json(supplier);
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};

export const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const supplier = await updateSupplier(id, name);

        res.json(supplier);
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};
