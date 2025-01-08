import { z } from 'zod';
import { procedure, router, updaterProcedure } from '../server/trpc';
import * as zoneSchemas from '../schemas/zone';
import * as zoneService from '../services/zone';

export const zoneRouter = router({
    update: updaterProcedure
        .meta({
            openapi: {
                method: 'POST',
                path: '/zone/update',
                tags: ['Zone'],
            },
        })
        .input(zoneSchemas.updateZone)
        .output(z.any())
        .mutation(({ input }) => zoneService.update(input)),
    pull: procedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/zone/pull',
                tags: ['Zone'],
            },
        })
        .input(zoneSchemas.pullZone)
        .output(z.any())
        .query(({ input }) => zoneService.pull(input)),
});
