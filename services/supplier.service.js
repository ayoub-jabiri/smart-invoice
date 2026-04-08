import Supplier from "../models/supplier.schema.js";

export const createSupplier = async (supplier) =>
    await Supplier.create(supplier);

export const getClientSuppliers = async (clientId) =>
    await Supplier.find({ clientId });

export const getSupplier = async (supplierId) =>
    await Supplier.findById(supplierId);
