import express from "express";
import { punchIn, punchOut } from "../controllers/attendance.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { getAttendance } from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/punch-in", protect, authorize("employee"), punchIn);
router.post("/punch-out", protect, authorize("employee"), punchOut);
router.get("/", protect, authorize("admin"), getAttendance);

export default router;
