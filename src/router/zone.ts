import { z } from 'zod';
import { procedure, router, zoneProcedure } from '../server/trpc';
import * as zoneSchemas from '../schemas/zone';
import * as zoneService from '../services/zone';

export const zoneRouter = router({
    create: zoneProcedure
        .meta({
            openapi: {
                method: 'POST',
                path: '/zone/create',
                tags: ['Zone'],
            },
        })
        .input(zoneSchemas.updateZoneArray)
        .output(z.any())
        .mutation(({ input }) => zoneService.create(input)),
    update: zoneProcedure
        .meta({
            openapi: {
                method: 'POST',
                path: '/zone/update',
                tags: ['Zone'],
            },
        })
        .input(zoneSchemas.updateZoneArray)
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
})