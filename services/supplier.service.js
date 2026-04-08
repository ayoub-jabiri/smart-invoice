import Supplier from "../models/supplier.schema.js";

export const createSupplier = async (supplier) =>
    await Supplier.create(supplier);
