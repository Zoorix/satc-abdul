import { createDrizzleDb } from "../db"; // adjust path if needed
import type { AppLoadContext } from "@remix-run/cloudflare";
import type { Env } from "../load-context";

// Accepts env object from context
export const satcDb = (env: Env) => {
  const connectionString = env.HYPERDRIVE.connectionString!;

  console.log(
    "satcDb connectionString =====================================",
    connectionString,
  );

  return createDrizzleDb(connectionString);
};

// For Remix loaders/actions (using AppLoadContext)
const db = (context: AppLoadContext) => {
  return satcDb(context.cloudflare.env);
};

export default db;
