import { createReadStream, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { drizzle } from "drizzle-orm/singlestore";
import mysql from "mysql2/promise";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pemPath = resolve(__dirname, "singlestore_bundle.pem");

const pool = mysql.createPool({
  uri: process.env.SINGLESTORE_DB_URL!,
  infileStreamFactory: (path) => createReadStream(path),
  multipleStatements: true,
  ssl: {
    ca: readFileSync(pemPath, "utf-8").trim(),
  },
});

export const singlestore = drizzle({ client: pool });
