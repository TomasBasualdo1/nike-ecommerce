import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import dotenv from "dotenv";
import fs from "fs";

// Prefer .env.local if present, fall back to .env
const envPath = fs.existsSync(".env.local") ? ".env.local" : ".env";
dotenv.config({ path: envPath });

if (!process.env.DATABASE_URL) {
  // Fail fast with a clear message instead of an ECONNREFUSED to localhost
  throw new Error(
    "DATABASE_URL is not set. Ensure it is defined in .env.local or .env before running the app/seed."
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Optional: you can tune pool size here
});

export const db = drizzle(pool, { schema });
