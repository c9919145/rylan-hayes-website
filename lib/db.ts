import fs from "node:fs";
import path from "node:path";
import { createClient, type Client } from "@libsql/client";

/**
 * Database connection.
 *
 * - Local development: a SQLite file (`file:` URL) via libSQL's native client.
 * - Production: a hosted libSQL/Turso database, configured with
 *   `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`.
 *
 * Both modes share the same async API, so route handlers don't care where the
 * data lives.
 */
const localPath =
  process.env.DATABASE_PATH || path.join(process.cwd(), "data", "rylan-hayes.db");

const url = process.env.TURSO_DATABASE_URL || `file:${localPath}`;
const authToken = process.env.TURSO_AUTH_TOKEN;
const isLocalFile = url.startsWith("file:");

if (process.env.VERCEL && !process.env.TURSO_DATABASE_URL) {
  console.warn(
    "[db] TURSO_DATABASE_URL is not set. Vercel's filesystem is ephemeral, so " +
      "database writes will not persist. See README → Deploying to Vercel with Turso.",
  );
}

const pragmas = isLocalFile
  ? `
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
`
  : "";

const schema = `
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
  __rylanHayesClient?: Client;
  __rylanHayesSchema?: Promise<void>;
};

const globalWithDb = globalThis as GlobalWithDb;

let schemaPromise: Promise<void> | undefined;

/**
 * Returns a ready-to-query client. The schema is created once per process on
 * first use (all statements are `IF NOT EXISTS`, so this is safe on every
 * cold start).
 */
export async function getDb(): Promise<Client> {
  if (!globalWithDb.__rylanHayesClient) {
    if (isLocalFile) {
      fs.mkdirSync(path.dirname(localPath), { recursive: true });
    }
    globalWithDb.__rylanHayesClient = createClient({ url, authToken });
  }

  const client = globalWithDb.__rylanHayesClient;

  if (!schemaPromise) {
    schemaPromise = (async () => {
      if (pragmas) await client.executeMultiple(pragmas);
      await client.executeMultiple(schema);
    })().catch((error) => {
      schemaPromise = undefined;
      throw error;
    });
  }

  await schemaPromise;
  return client;
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
