import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from'./schema'

const dbUrl = process.env.NEXT_PUBLIC_DATABASE_URL || process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error(
    "No database connection string was provided. Please ensure NEXT_PUBLIC_DATABASE_URL or DATABASE_URL is set in .env.local."
  );
}

const sql = neon(dbUrl);
export const db = drizzle({ client: sql, schema });