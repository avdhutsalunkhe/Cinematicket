import { Request, Response } from "express";
import { getDB } from "../db/sqlite";

// Get all stores
export const getStores = async (req: Request, res: Response) => {
  try {
    const db = await getDB();
    const stores = await db.all("SELECT * FROM stores");
    res.status(200).json(stores);
  } catch (error) {
    console.error("Error retrieving stores:", error);
    res.status(500).json({ message: "Error retrieving stores", error });
  }
};

// Submit a rating
export const submitRating = async (req: Request, res: Response) => {
  const { userId, storeId, rating } = req.body;

  if (!userId || !storeId || !rating) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const db = await getDB();
    await db.run(
      "INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)",
      [userId, storeId, rating]
    );
    res.status(201).json({ message: "Rating submitted successfully" });
  } catch (error: any) {
    console.error("Error submitting rating:", error);
    if (error.code === "SQLITE_CONSTRAINT") {
      return res.status(400).json({ message: "You have already rated this store" });
    }
    res.status(500).json({ message: "Error submitting rating", error });
  }
};

// Update a rating
export const updateRating = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating } = req.body;

  if (!rating) {
    return res.status(400).json({ message: "Rating value is required" });
  }

  try {
    const db = await getDB();
    const result = await db.run("UPDATE ratings SET rating = ? WHERE id = ?", [rating, id]);

    if (result.changes === 0) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.status(200).json({ message: "Rating updated successfully" });
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({ message: "Error updating rating", error });
  }
};
