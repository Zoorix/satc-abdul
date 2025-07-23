import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema"; // adjust path if needed

// Export a function to create a Drizzle DB instance
export const createDrizzleDb = (connectionString: string) => {
  const sql = postgres(connectionString, {
    max: 1,
    idle_timeout: 2,
    connect_timeout: 5,
  });
  return drizzle(sql, { schema });
};
