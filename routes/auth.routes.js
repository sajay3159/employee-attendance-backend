import express from "express";
import { createUser, login } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/login", login);

router.get("/me", protect, (req, res) => {
  res.json(req.user);
});
router.post("/create-user", protect, authorize("admin"), createUser);

export default router;
