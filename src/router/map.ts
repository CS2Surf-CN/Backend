import { z } from 'zod';
import { procedure, router, updaterProcedure } from '../server/trpc';
import * as mapSchemas from '../schemas/map';
import * as mapService from '../services/map';

export const mapRouter = router({
    info_update: updaterProcedure
        .meta({
            openapi: {
                method: 'POST',
                path: '/map/info/update',
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
                path: '/map/info/pull',
                tags: ['Map'],
            },
        })
        .input(mapSchemas.pullInfo)
        .output(z.any())
        .query(({ input }) => mapService.info_pull(input)),
});
