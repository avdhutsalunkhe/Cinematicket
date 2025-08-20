import { getDB } from "../db/sqlite";

// Define Store interface
export interface Store {
  id?: number;
  name: string;
  email: string;
  address: string;
  owner_id: number;
}

// Create a store
export const createStore = async (store: Omit<Store, "id">): Promise<Store> => {
  const db = await getDB();
  const { name, email, address, owner_id } = store;
  const result: any = await db.run(
    "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)",
    [name, email, address, owner_id]
  );
  return { id: result.lastID, ...store };
};

// Get all stores
export const getAllStores = async (): Promise<Store[]> => {
  const db = await getDB();
  return db.all("SELECT * FROM stores");
};

// Get store by ID
export const getStoreById = async (id: number): Promise<Store | undefined> => {
  const db = await getDB();
  return db.get("SELECT * FROM stores WHERE id = ?", [id]);
};

// Update store
export const updateStore = async (id: number, store: Partial<Omit<Store, "id">>): Promise<void> => {
  const db = await getDB();
  if (Object.keys(store).length === 0) return;
  const fields = Object.keys(store).map(key => `${key} = ?`).join(", ");
  const values = Object.values(store);
  await db.run(`UPDATE stores SET ${fields} WHERE id = ?`, [...values, id]);
};

// Delete store
export const deleteStore = async (id: number): Promise<void> => {
  const db = await getDB();
  await db.run("DELETE FROM stores WHERE id = ?", [id]);
};
