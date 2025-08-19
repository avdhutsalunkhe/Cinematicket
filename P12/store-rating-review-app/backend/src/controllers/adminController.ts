import { Request, Response } from "express";
import db from "../db/sqlite";

// -------------------------
// Get dashboard data for admin
// -------------------------
export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const database = await db();
    const totalUsers = await database.get<{ count: number }>(
      "SELECT COUNT(*) as count FROM users"
    );
    const totalStores = await database.get<{ count: number }>(
      "SELECT COUNT(*) as count FROM stores"
    );
    const totalRatings = await database.get<{ count: number }>(
      "SELECT COUNT(*) as count FROM ratings"
    );

    res.json({
      totalUsers: totalUsers?.count || 0,
      totalStores: totalStores?.count || 0,
      totalRatings: totalRatings?.count || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data", error });
  }
};

// -------------------------
// Add a new user
// -------------------------
export const addUser = async (req: Request, res: Response) => {
  const { name, email, password, address, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const database = await db();
    const result = await database.run(
      "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, address, role]
    );

    res.status(201).json({
      id: result.lastID,
      name,
      email,
      address,
      role,
    });
  } catch (error) {
    res.status(400).json({ message: "Error adding user", error });
  }
};

// -------------------------
// Add a new store
// -------------------------
export const addStore = async (req: Request, res: Response) => {
  const { name, email, address, owner_id } = req.body;

  if (!name || !owner_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const database = await db();
    const result = await database.run(
      "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)",
      [name, email, address, owner_id]
    );

    res.status(201).json({
      id: result.lastID,
      name,
      email,
      address,
      owner_id,
    });
  } catch (error) {
    res.status(400).json({ message: "Error adding store", error });
  }
};

// -------------------------
// Get list of users (with optional filter)
// -------------------------
export const getUsersList = async (req: Request, res: Response) => {
  const filter = (req.query.filter as string) || "";

  try {
    const database = await db();
    const users = await database.all(
      "SELECT * FROM users WHERE name LIKE ? OR email LIKE ?",
      [`%${filter}%`, `%${filter}%`]
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users list", error });
  }
};

// -------------------------
// Get list of stores (with optional filter)
// -------------------------
export const getStoresList = async (req: Request, res: Response) => {
  const filter = (req.query.filter as string) || "";

  try {
    const database = await db();
    const stores = await database.all(
      "SELECT * FROM stores WHERE name LIKE ? OR address LIKE ?",
      [`%${filter}%`, `%${filter}%`]
    );

    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stores list", error });
  }
};
