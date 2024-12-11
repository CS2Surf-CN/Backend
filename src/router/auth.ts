import { z } from 'zod';
import { router, procedure } from '../server/trpc';
import * as authSchemas from '../schemas/auth';
import * as authService from '../services/auth';

export const authRouter = router({
    login: procedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/auth/login',
            },
        })
        .input(z.undefined())
        .output(z.any())
        .query(({ ctx: { req } }) => authService.login(req)),
})