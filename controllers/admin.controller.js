// Internal Modules
import { getClients } from "../services/user.service.js";
import { errorResponse } from "../utils/error.response.js";

export const clients = async (req, res) => {
    try {
        const clients = await getClients();

        res.json(clients);
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};
