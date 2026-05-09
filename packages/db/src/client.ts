import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./index";

let cachedClient: ReturnType<typeof postgres> | null = null;
let cachedDb: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to initialize the database client");
  }

  cachedClient = postgres(databaseUrl, {
    max: 10,
    prepare: false
  });
  cachedDb = drizzle(cachedClient, { schema });
  return cachedDb;
}

export async function closeDatabase() {
  if (cachedClient) {
    await cachedClient.end();
    cachedClient = null;
    cachedDb = null;
  }
}
