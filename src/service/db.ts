import { PrismaClient } from "../../prisma/generated";
const createPrismaClient = () => new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});
export const db = createPrismaClient();
export type * from "../../prisma/generated/";