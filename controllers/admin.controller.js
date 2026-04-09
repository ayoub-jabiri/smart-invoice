// Internal Modules
import { getClients, getClientInfo } from "../services/user.service.js";
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

export const clientInfo = async (req, res) => {
    const { id } = req.params;

    const infoType = req.url.split("/");

    try {
        const info = await getClientInfo(infoType[infoType.length - 1], id);

        res.json(info);
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};
