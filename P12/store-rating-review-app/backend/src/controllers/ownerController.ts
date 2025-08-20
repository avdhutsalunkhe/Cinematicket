// src/controllers/ownerController.ts
import { Request, Response } from "express";
import { getDB } from "../db/sqlite";

// GET: Owner Dashboard (average rating, total ratings, users who rated)
export const getOwnerDashboard = async (req: Request, res: Response) => {
  const ownerId = (req as any).user?.id; // Ensure middleware adds req.user

  if (!ownerId) {
    return res.status(401).json({ message: "Unauthorized: Owner not logged in" });
  }

  try {
    const db = await getDB();

    const storeRatings = await db.get(
      `SELECT AVG(rating) as average_rating, COUNT(rating) as total_ratings 
       FROM ratings 
       WHERE store_id IN (SELECT id FROM stores WHERE owner_id = ?)`,
      [ownerId]
    );

    const usersWhoRated = await db.all(
      `SELECT DISTINCT users.name, users.email 
       FROM ratings 
       JOIN users ON ratings.user_id = users.id 
       WHERE store_id IN (SELECT id FROM stores WHERE owner_id = ?)`,
      [ownerId]
    );

    res.json({
      average_rating: storeRatings?.average_rating || 0,
      total_ratings: storeRatings?.total_ratings || 0,
      users_who_rated: usersWhoRated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving dashboard data",
      error: (error as Error).message,
    });
  }
};

// GET: Owner's Stores
export const getOwnerStores = async (req: Request, res: Response) => {
  const ownerId = (req as any).user?.id;

  if (!ownerId) {
    return res.status(401).json({ message: "Unauthorized: Owner not logged in" });
  }

  try {
    const db = await getDB();

    const stores = await db.all(
      `SELECT id, name, address 
       FROM stores 
       WHERE owner_id = ?`,
      [ownerId]
    );

    res.json({ stores });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving owner stores",
      error: (error as Error).message,
    });
  }
};

// GET: Detailed Store Report (ratings + users)
export const getStoreReport = async (req: Request, res: Response) => {
  const ownerId = (req as any).user?.id;
  const { storeId } = req.params;

  if (!ownerId) {
    return res.status(401).json({ message: "Unauthorized: Owner not logged in" });
  }

  try {
    const db = await getDB();

    const store = await db.get(
      `SELECT id, name, address 
       FROM stores 
       WHERE id = ? AND owner_id = ?`,
      [storeId, ownerId]
    );

    if (!store) {
      return res.status(404).json({ message: "Store not found or not owned by you" });
    }

    const ratings = await db.all(
      `SELECT r.rating, r.created_at, u.name as user_name, u.email as user_email 
       FROM ratings r
       JOIN users u ON r.user_id = u.id
       WHERE r.store_id = ?`,
      [storeId]
    );

    res.json({ store, ratings });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving store report",
      error: (error as Error).message,
    });
  }
};
