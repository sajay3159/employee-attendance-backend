import express from "express";
import { getDashboardAnalytics } from "../controllers/analytics.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/dashboard", protect, authorize("admin"), getDashboardAnalytics);

export default router;
