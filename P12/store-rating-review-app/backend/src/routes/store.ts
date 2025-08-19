import { Router } from "express";
import { getStores, submitRating, updateRating } from "../controllers/storeController";

const router = Router();

router.get("/", getStores);
router.post("/rating", submitRating);
router.put("/rating/:id", updateRating);

export default router;
