import { router } from '../server/trpc';
import { authRouter } from './auth';
import { mapRouter } from './map';

export const appRouter = router({
    auth: authRouter,
    map: mapRouter,
});
