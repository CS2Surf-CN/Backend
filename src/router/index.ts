import { router } from '../server/trpc'
import { authRouter } from './auth';
import { zoneRouter } from './zone';

export const appRouter = router({
    auth: authRouter,
    zone: zoneRouter,
});