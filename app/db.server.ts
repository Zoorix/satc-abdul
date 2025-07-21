import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// declare global {
//   var prismaGlobal: PrismaClient;
// }

// if (process.env.NODE_ENV !== "production") {
//   if (!global.prismaGlobal) {
//     global.prismaGlobal = new PrismaClient();
//   }
// }

// const prisma = global.prismaGlobal ?? new PrismaClient();

// export default prisma;

const prisma = (DATABASE_URL: string) =>
  new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());

export default prisma;
