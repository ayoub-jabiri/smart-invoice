// External Modules
import "dotenv/config";
import express from "express";

// Internal Modules
import { dbConnect } from "./config/db.js";
import userRoutes from "./routes/user.router.js";

const app = express();

// Database Connection
const PORT = process.env.PORT;
dbConnect();

app.use(express.json());

app.use("/api/auth", userRoutes);

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
});
