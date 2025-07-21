import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

export const pgPool = new pg.Pool({ connectionString: process.env.NEON_DB_URL });

export const neon = drizzle(pgPool);
