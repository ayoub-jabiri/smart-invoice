// External Modules
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Internal Modules
import { registerUser, getUser } from "../services/user.service.js";
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

        const accessToken = jwt.sign(
            JSON.stringify(user),
            process.env.ACCESS_TOKEN_SECRET
        );

        res.status(201).json({
            message: "The user has been registered successfully!",
            user,
            accessToken,
        });
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};

export const login = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await getUser({ email });

        const accessToken = jwt.sign(
            JSON.stringify(user),
            process.env.ACCESS_TOKEN_SECRET
        );
        res.status(200).json({
            accessToken,
        });
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};
