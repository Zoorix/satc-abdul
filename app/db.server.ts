import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
export const drizzleDb = drizzle(sql);

// Setup for Prisma Accelerate
// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";

// const prisma = (DATABASE_URL: string) =>
//   new PrismaClient({
//     datasourceUrl: DATABASE_URL,
//   }).$extends(withAccelerate());

// export default prisma;
