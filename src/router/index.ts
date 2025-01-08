import { router } from '../server/trpc';
import { authRouter } from './auth';
import { zoneRouter } from './zone';
import { mapRouter } from './map';

export const appRouter = router({
    auth: authRouter,
    zone: zoneRouter,
    map: mapRouter,
});
