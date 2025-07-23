import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "db/schema"; // adjust path if needed
import type { AppLoadContext } from "@remix-run/cloudflare";
import type { Env } from "../load-context";

// Accepts env object from context
export const satcDb = (env: Env) => {
  const connectionString = env.HYPERDRIVE.connectionString!;

  console.log(
    "satcDb connectionString =====================================",
    connectionString,
  );

  const sql = postgres(connectionString, {
    max: 1, // Single connection per worker instance
    idle_timeout: 2, // Short idle timeout
    connect_timeout: 5, // Quick connect timeout
    // Hyperdrive handles connection pooling, so we keep this minimal
  });
  return drizzle(sql, { schema });
};

// For Remix loaders/actions (using AppLoadContext)
const db = (context: AppLoadContext) => {
  return satcDb(context.cloudflare.env);
};

export default db;
