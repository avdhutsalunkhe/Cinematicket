import { getDB } from "../db/sqlite";

export interface Rating {
  id: number;
  user_id: number;
  store_id: number;
  rating: number;
  created_at: Date;
}

export const createRating = async (
  userId: number,
  storeId: number,
  rating: number
): Promise<Rating> => {
  const db = await getDB();
  const result: any = await db.run(
    "INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)",
    [userId, storeId, rating]
  );
  return {
    id: result.lastID,
    user_id: userId,
    store_id: storeId,
    rating,
    created_at: new Date(),
  };
};

export const updateRating = async (id: number, rating: number): Promise<void> => {
  const db = await getDB();
  await db.run("UPDATE ratings SET rating = ? WHERE id = ?", [rating, id]);
};

export const getRatingByUserAndStore = async (
  userId: number,
  storeId: number
): Promise<Rating | null> => {
  const db = await getDB();
  const rating = await db.get(
    "SELECT * FROM ratings WHERE user_id = ? AND store_id = ?",
    [userId, storeId]
  );
  return rating || null;
};

export const getRatingsByStore = async (storeId: number): Promise<Rating[]> => {
  const db = await getDB();
  return db.all("SELECT * FROM ratings WHERE store_id = ?", [storeId]);
};
