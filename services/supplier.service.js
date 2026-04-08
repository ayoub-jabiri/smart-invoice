import Supplier from "../models/supplier.schema.js";

export const createSupplier = async (supplier) =>
    await Supplier.create(supplier);

export const getClientSuppliers = async (clientId) =>
    await Supplier.find({ clientId });

export const getSupplier = async (supplierId) =>
    await Supplier.findById(supplierId);

export const updateSupplier = async (supplierId, newName) => {
    const supplier = await Supplier.findById(supplierId);

    supplier.name = newName;

    return await supplier.save();
};

export const deleteSupplier = async (supplierId) =>
    await Supplier.deleteOne({ _id: supplierId });
