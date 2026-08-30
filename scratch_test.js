const { neon } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-http');
const { pgTable, serial, varchar } = require('drizzle-orm/pg-core');
const fs = require('fs');

const envText = fs.readFileSync('.env.local', 'utf8');
const dbUrlMatch = envText.match(/(?:DATABASE_URL|NEXT_PUBLIC_DATABASE_URL)=["']?([^"'\r\n]+)/);
const dbUrl = dbUrlMatch ? dbUrlMatch[1] : null;

console.log("DB URL found:", !!dbUrl);

const Budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: varchar('amount').notNull(),
    icon: varchar('icon'),
    createdBy: varchar('createdBy').notNull(),
});

const sql = neon(dbUrl);
const db = drizzle({ client: sql });

async function main() {
  try {
    console.log("Testing db.insert...");
    const res = await db.insert(Budgets).values({
      name: "ashu",
      amount: "300",
      icon: "✊",
      createdBy: "ashutosh.shelar2409@gmail.com"
    }).returning({ insertedId: Budgets.id });
    console.log("SUCCESS:", res);
  } catch (err) {
    console.error("ERROR CAUSE:", err);
  }
}

main();
