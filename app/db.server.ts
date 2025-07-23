import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "db/schema"; // adjust path if needed
import type { AppLoadContext } from "@remix-run/cloudflare";

// Accepts Hyperdrive connection string from env/context
export const drizzleDb = (connectionString: string) => {
  const sql = neon(connectionString);
  return drizzle(sql, { schema });
};

// For Remix loaders/actions (using AppLoadContext)
const db = (context: AppLoadContext) => {
  // Use Hyperdrive connection string only
  return drizzleDb(context.cloudflare.env.HYPERDRIVE.connectionString!);
};

export default db;

// Setup for Prisma Accelerate
// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";

// const prisma = (DATABASE_URL: string) =>
//   new PrismaClient({
//     datasourceUrl: DATABASE_URL,
//   }).$extends(withAccelerate());

// export default prisma;
