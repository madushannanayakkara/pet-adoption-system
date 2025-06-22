import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connection from "./db.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import clientsRoutes from "./routes/clients.js";

dotenv.config();
const app = express();

// Connect to MongoDB
connection();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", clientsRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
