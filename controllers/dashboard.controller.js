// Internal Modules
import { getDashboardStats } from "../services/stats.service.js";
import { errorResponse } from "../utils/error.response.js";

export const dashboardStats = async (req, res) => {
    try {
        res.json("invoice");
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};
