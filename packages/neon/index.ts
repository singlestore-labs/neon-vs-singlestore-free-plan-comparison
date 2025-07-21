import { drizzle } from "drizzle-orm/neon-http";

export const neon = drizzle(process.env.NEON_DB_URL!);
