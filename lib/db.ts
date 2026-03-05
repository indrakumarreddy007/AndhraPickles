import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

/**
 * Neon serverless SQL client.
 * Re-using the same connection per function invocation is intentional –
 * Neon's driver handles connection pooling transparently.
 */
export const sql = neon(process.env.DATABASE_URL);
