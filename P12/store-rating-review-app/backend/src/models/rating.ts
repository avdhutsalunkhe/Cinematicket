import { db } from '../db/sqlite';

export interface Rating {
  id: number;
  user_id: number;
  store_id: number;
  rating: number;
  created_at: Date;
}

export const createRating = async (userId: number, storeId: number, rating: number): Promise<Rating> => {
  const result = await db.run(
    'INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)',
    [userId, storeId, rating]
  );
  return { id: result.lastID, user_id: userId, store_id: storeId, rating, created_at: new Date() };
};

export const updateRating = async (id: number, rating: number): Promise<void> => {
  await db.run('UPDATE ratings SET rating = ? WHERE id = ?', [rating, id]);
};

export const getRatingByUserAndStore = async (userId: number, storeId: number): Promise<Rating | null> => {
  const rating = await db.get('SELECT * FROM ratings WHERE user_id = ? AND store_id = ?', [userId, storeId]);
  return rating || null;
};

export const getRatingsByStore = async (storeId: number): Promise<Rating[]> => {
  return await db.all('SELECT * FROM ratings WHERE store_id = ?', [storeId]);
};