// Internal Modules
import { getDashboardStats } from "../services/stats.service.js";
import { errorResponse } from "../utils/error.response.js";

export const dashboardStats = async (req, res) => {
    try {
        const stats = await getDashboardStats(req.user._id);

        res.json(stats);
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, `An internal error: ${error.message}`);
    }
};
