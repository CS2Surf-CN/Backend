import { z } from 'zod';
import { router, zoneProcedure } from '../server/trpc';
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
})