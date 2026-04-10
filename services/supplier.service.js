import Supplier from "../models/supplier.schema.js";

export const createSupplier = async (supplier) =>
    await Supplier.create(supplier);

export const getClientSuppliers = async (
    clientId,
    supplierName,
    suppliersToSkip,
    suppliersLimit
) => {
    if (supplierName) {
        return await Supplier.find({
            clientId,
            name: supplierName,
        })
            .skip(suppliersToSkip)
            .limit(suppliersLimit);
    } else {
        return await Supplier.find({ clientId })
            .skip(suppliersToSkip)
            .limit(suppliersLimit);
    }
};

export const getSupplier = async (supplierId) =>
    await Supplier.findById(supplierId);

export const updateSupplier = async (supplierId, newName) => {
    const supplier = await Supplier.findById(supplierId);

    supplier.name = newName;

    return await supplier.save();
};

export const deleteSupplier = async (supplierId) =>
    await Supplier.deleteOne({ _id: supplierId });
