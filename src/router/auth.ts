import { z } from 'zod';
import { router, procedure } from '../server/trpc';
import * as authSchemas from '../schemas/auth';
import * as authService from '../services/auth';

export const authRouter = router({
    status: procedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/auth/status',
                tags: ['Auth'],
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
            },
        })
        .input(z.undefined())
        .output(z.any())
        .query(({ ctx: { req } }) => authService.zone(req)),
})