import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

if (typeof window !== 'undefined') {
  throw new Error("SERVER-ONLY: Database configuration cannot be imported or executed in client components.");
}

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error(
    "No database connection string was provided. Please ensure DATABASE_URL is set in environment variables."
  );
}

const sql = neon(dbUrl);
export const db = drizzle({ client: sql, schema });