import { TRPCError } from '@trpc/server';
import { APIResponse, successResponse } from '../utils/response';
import * as zoneSchemas from '../schemas/zone';
import { db } from './db';

export async function update(input: zoneSchemas.updateZoneInput): Promise<APIResponse> {
    try {
        const newEntries = input.data.filter((x) => x.id === undefined);
        if (newEntries.length > 0) {
            await db.mapzones.createMany({
                data: newEntries,
            });
        }

        const updatePromises = input.data
            .filter((x) => x.id !== undefined)
            .map((x) => {
                return db.mapzones.update({
                    where: { id: x.id },
                    data: x,
                });
            });

        await Promise.all(updatePromises);
    } catch (error) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: `${error}` });
    }

    return successResponse('');
}

export async function pull(input: zoneSchemas.pullZoneInput): Promise<APIResponse> {
    const data = await db.mapzones.findMany({
        where: {
            map: input.map,
        },
    });

    if (!data) {
        throw new TRPCError({ code: 'BAD_REQUEST' });
    }

    return successResponse(data);
}
