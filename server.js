// External Modules
import "dotenv/config";
import express from "express";

// Internal Modules
import { dbConnect } from "./config/db.js";
import userRoutes from "./routes/user.router.js";
import supplierRoutes from "./routes/supplier.router.js";
import invoiceRoutes from "./routes/invoice.router.js";
import dashboardRoutes from "./routes/dashboard.router.js";
import adminRoutes from "./routes/admin.router.js";

const app = express();

// Database Connection
const PORT = process.env.PORT;
dbConnect();

app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
});
