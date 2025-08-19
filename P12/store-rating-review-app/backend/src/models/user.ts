// src/models/user.ts
import sqlite3, { Database } from "sqlite3";

// Define User interface
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  role: "admin" | "user" | "store_owner";
}

export class UserModel {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  public async createUser(user: Omit<User, "id">): Promise<User> {
    const { name, email, password, address, role } = user;
    return new Promise<User>((resolve, reject) => {
      this.db.run(
        `INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)`,
        [name, email, password, address, role],
        function (err: Error | null) {
          if (err) return reject(err);
          resolve({ id: this.lastID, ...user });
        }
      );
    });
  }

  public async getUserById(id: number): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
        if (err) return reject(err);
        resolve(row ? (row as User) : null);
      });
    });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
        if (err) return reject(err);
        resolve(row ? (row as User) : null);
      });
    });
  }

  public async updateUser(id: number, updates: Partial<User>): Promise<void> {
    const fields = Object.keys(updates)
      .filter((key) => updates[key as keyof User] !== undefined)
      .map((key) => `${key} = ?`);
    const values = Object.values(updates).filter((v) => v !== undefined);

    if (fields.length === 0) return; // nothing to update

    return new Promise<void>((resolve, reject) => {
      this.db.run(
        `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
        [...values, id],
        function (err: Error | null) {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }

  public async deleteUser(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  public async getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM users`, (err, rows) => {
        if (err) return reject(err);
        resolve(rows as User[]);
      });
    });
  }
}
