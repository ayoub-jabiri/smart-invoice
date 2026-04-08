import { createSupplier } from "../services/supplier.service.js";

export const create = async (req, res) => {
    const { name } = req.body;
    try {
        const supplier = await createSupplier({
            name,
            clientId: req.user._id,
        });

        res.json(supplier);
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error");
    }
};
