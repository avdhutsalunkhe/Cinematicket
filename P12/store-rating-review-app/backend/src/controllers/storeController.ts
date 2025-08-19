import { Request, Response } from "express";
import db from "../db/sqlite";

// Get all stores
export const getStores = async (req: Request, res: Response) => {
    try {
        const database = await db();
        const stores = await database.all("SELECT * FROM stores");
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving stores", error });
    }
};

// Submit a rating
export const submitRating = async (req: Request, res: Response) => {
    const { userId, storeId, rating } = req.body;
    try {
        const database = await db();
        await database.run(
            "INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)",
            [userId, storeId, rating]
        );
        res.status(201).json({ message: "Rating submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error submitting rating", error });
    }
};

// Update a rating
export const updateRating = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { rating } = req.body;
    try {
        const database = await db();
        await database.run("UPDATE ratings SET rating = ? WHERE id = ?", [rating, id]);
        res.status(200).json({ message: "Rating updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating rating", error });
    }
};
