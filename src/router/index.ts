import { router } from '../server/trpc'
import { authRouter } from './auth';

export const appRouter = router({
    auth: authRouter,
});