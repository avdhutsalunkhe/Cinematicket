import { Request, Response } from "express";
import db from "../db/sqlite";

// ✅ Get all stores
export const getStores = async (req: Request, res: Response) => {
  try {
    const stores = await db.all("SELECT * FROM stores");
    return res.status(200).json({ success: true, data: stores });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error retrieving stores", error });
  }
};

// ✅ Submit a rating
export const submitRating = async (req: Request, res: Response) => {
  const { userId, storeId, rating } = req.body;

  if (!userId || !storeId || rating === undefined) {
    return res.status(400).json({ success: false, message: "userId, storeId and rating are required" });
  }

  try {
    await db.run(
      "INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)",
      [userId, storeId, rating]
    );

    return res.status(201).json({ success: true, message: "Rating submitted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error submitting rating", error });
  }
};

// ✅ Update a rating
export const updateRating = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating } = req.body;

  if (!rating) {
    return res.status(400).json({ success: false, message: "Rating is required" });
  }

  try {
    const result = await db.run("UPDATE ratings SET rating = ? WHERE id = ?", [rating, id]);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "Rating not found" });
    }

    return res.status(200).json({ success: true, message: "Rating updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating rating", error });
  }
};
