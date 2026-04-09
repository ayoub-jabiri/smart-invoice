// Internal Modules
import User from "../models/user.schema.js";
import Supplier from "../models/supplier.schema.js";

export const registerUser = async (user) => await User.create(user);

export const getUser = async (query) => await User.findOne(query);

export const getClients = async () => await User.find({ role: "client" });

export const getClientInfo = async (infoType, clientId) => {
    switch (infoType) {
        case "suppliers":
            return await Supplier.find({ clientId });
        default:
            break;
    }
};
