// External Modules
import mongoose from "mongoose";

// Internal Modules
import User from "../models/user.schema.js";

export const registerUser = async (user) => await User.create(user);

export const getUser = async (query) => await User.findOne(query);
