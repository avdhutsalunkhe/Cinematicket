import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";

const DB_PATH = path.resolve(__dirname, "../../database.db");

export default async function db(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
    return open({
        filename: DB_PATH,
        driver: sqlite3.Database,
    });
}
