import { Prisma, PrismaClient } from '../../prisma/generated';
import { pagination } from 'prisma-extension-pagination';

const createPrismaClient = () =>
    new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
        transactionOptions: {
            maxWait: 2000 * 5,
            timeout: 5000 * 5,
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
    }).$extends(pagination());

export const db = createPrismaClient();
export type * from '../../prisma/generated';

export type DbClient = ReturnType<typeof createPrismaClient>;
export type TransactionClient = Parameters<Parameters<DbClient['$transaction']>[0]>[0];

// export type TransactionClient = Omit<
//     PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
//     "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
// >
