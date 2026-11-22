import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const databasePath =
  process.env.DATABASE_PATH || path.join(process.cwd(), "data", "rylan-hayes.db");

const schema = `
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    postal_code TEXT,
    consent INTEGER NOT NULL DEFAULT 1,
    source TEXT NOT NULL DEFAULT 'website',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    address1 TEXT NOT NULL,
    address2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'United States',
    shipping_method TEXT NOT NULL,
    subtotal INTEGER NOT NULL,
    shipping INTEGER NOT NULL,
    tax INTEGER NOT NULL,
    total INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'confirmed',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_slug TEXT NOT NULL,
    product_name TEXT NOT NULL,
    variant TEXT,
    unit_price INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    line_total INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    topic TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
  CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
`;

type GlobalWithDb = typeof globalThis & {
  __rylanHayesDb?: Database.Database;
};

const globalWithDb = globalThis as GlobalWithDb;

export function getDb() {
  if (!globalWithDb.__rylanHayesDb) {
    fs.mkdirSync(path.dirname(databasePath), { recursive: true });
    const db = new Database(databasePath);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    db.exec(schema);
    globalWithDb.__rylanHayesDb = db;
  }

  return globalWithDb.__rylanHayesDb;
}

export interface SubscriberRow {
  id: number;
  name: string;
  email: string;
  postal_code: string | null;
  consent: number;
  source: string;
  created_at: string;
}

export interface OrderRow {
  id: number;
  order_number: string;
  email: string;
  first_name: string;
  last_name: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  shipping_method: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: string;
  created_at: string;
}

export interface OrderItemRow {
  id: number;
  order_id: number;
  product_slug: string;
  product_name: string;
  variant: string | null;
  unit_price: number;
  quantity: number;
  line_total: number;
}
