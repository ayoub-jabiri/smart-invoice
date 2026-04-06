// External Modules
import bcrypt from "bcrypt";

// Internal Modules
import { registerUser } from "../services/user.service.js";
import { errorResponse } from "../utils/error.response.js";

export const register = async (req, res) => {
    const { name, email, role } = req.body;
    try {
        const password = await bcrypt.hash(req.body.password, 10);

        const user = await registerUser({
            name,
            email,
            password,
            role,
        });

        res.status(201).json({
            message: "The user has been registered successfully!",
            user,
        });
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};
