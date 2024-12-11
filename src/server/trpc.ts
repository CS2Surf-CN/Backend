import { initTRPC, TRPCError } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';
import { Context } from '.';
import { ZodError } from 'zod';
import { db } from '../services/db';
import superjson from 'superjson';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../services/auth';

const t = initTRPC
    .context<Context>()
    .meta<OpenApiMeta>()
    .create({
        transformer: superjson,
        errorFormatter: ({ shape, error }) => ({
            ...shape,
            data: {
                ...shape.data,
                zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        }),
    });

export const router = t.router;
export const middleware = t.middleware;

// public
export const procedure = t.procedure;

// apikey layer
export const apikeyProcedure = t.procedure.use(async ({ ctx, next }) => {
    const { req } = ctx;
    const token = req.header('authorization')?.split('Bearer ')[1];
    const payload = token ? (jwt.verify(token, process.env.JWT_TOKEN_SECURE!) as JWTPayload) : null;
    if (!payload) throw new TRPCError({ code: 'UNAUTHORIZED' });
    const session = await db.credential.findUnique({ where: { key: payload.api_key } });
    if (!session) throw new TRPCError({ code: 'UNAUTHORIZED' });
    return next({ ctx: { session, db, paid: false } });
});