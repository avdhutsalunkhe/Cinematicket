import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";

const DB_PATH = path.resolve(__dirname, "../../database.db");

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function getDB(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
  if (!db) {
    db = await open({
      filename: DB_PATH,
      driver: sqlite3.Database,
    });
  }
  return db;
}
