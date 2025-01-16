import { z } from 'zod';
import { procedure, router, updaterProcedure } from '../server/trpc';
import * as mapSchemas from '../schemas/map';
import * as mapService from '../services/map';

export const mapRouter = router({
    info_update: updaterProcedure
        .meta({
            openapi: {
                method: 'POST',
                path: '/map/info',
                tags: ['Map'],
            },
        })
        .input(mapSchemas.updateInfo)
        .output(z.any())
        .mutation(({ input }) => mapService.info_update(input)),
    info_pull: procedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/map/info',
                tags: ['Map'],
            },
        })
        .input(mapSchemas.pullInfo)
        .output(z.any())
        .query(({ input }) => mapService.info_pull(input)),
    zone_update: updaterProcedure
        .meta({
            openapi: {
                method: 'POST',
                path: '/map/zone',
                tags: ['Map'],
            },
        })
        .input(mapSchemas.updateZone)
        .output(z.any())
        .mutation(({ input }) => mapService.zone_update(input)),
    zone_pull: procedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/map/zone',
                tags: ['Map'],
            },
        })
        .input(mapSchemas.pullZone)
        .output(z.any())
        .query(({ input }) => mapService.zone_pull(input)),
});
