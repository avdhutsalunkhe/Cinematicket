import { db } from "../config/db";
import { Store } from "../models/store";

// Create a store
export const createStore = async (store: Store): Promise<Store> => {
  const { name, email, address, owner_id } = store;
  const result: any = await db.run(
    'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',
    [name, email, address, owner_id]
  );
  return { id: result.lastID, ...store };
};

// Get all stores
export const getAllStores = async (): Promise<Store[]> => {
  return db.all('SELECT * FROM stores');
};

// Get store by ID
export const getStoreById = async (id: number): Promise<Store | undefined> => {
  return db.get('SELECT * FROM stores WHERE id = ?', [id]);
};

// Update store
export const updateStore = async (id: number, store: Partial<Store>): Promise<void> => {
  const fields = Object.keys(store).map(key => `${key} = ?`).join(', ');
  const values = Object.values(store);
  await db.run(`UPDATE stores SET ${fields} WHERE id = ?`, [...values, id]);
};

// Delete store
export const deleteStore = async (id: number): Promise<void> => {
  await db.run('DELETE FROM stores WHERE id = ?', [id]);
};
