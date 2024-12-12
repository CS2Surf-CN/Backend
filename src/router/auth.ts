import { z } from 'zod';
import { router, procedure } from '../server/trpc';
import * as authSchemas from '../schemas/auth';
import * as authService from '../services/auth';

export const authRouter = router({
    gen: procedure
        .meta({
            openapi: {
                method: 'POST',
                path: '/auth/gen',
                tags: ['Auth'],
                protect: true,
            },
        })
        .input(authSchemas.apiGen)
        .output(z.any())
        .mutation(({ input, ctx: { req } }) => authService.gen(input, req)),
    status: procedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/auth/status',
                tags: ['Auth'],
                protect: true,
            },
        })
        .input(z.undefined())
        .output(z.any())
        .query(({ ctx: { req } }) => authService.status(req)),
    zone: procedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/auth/zone',
                tags: ['Auth'],
                protect: true,
            },
        })
        .input(z.undefined())
        .output(z.any())
        .query(({ ctx: { req } }) => authService.zone(req)),
});
