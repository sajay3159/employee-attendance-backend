import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Attendance API running" });
});
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);

export default app;
