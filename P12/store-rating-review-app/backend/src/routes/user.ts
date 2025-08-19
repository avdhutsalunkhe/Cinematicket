import { Router } from "express";
import authenticate from "../middleware/auth";
import { getMe } from "../controllers/authController"; // reuse getMe if needed

const router = Router();

router.get("/profile", authenticate, getMe); // protected route

export default router;
