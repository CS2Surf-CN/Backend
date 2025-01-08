import { TRPCError } from '@trpc/server';
import { APIResponse, successResponse } from '../utils/response';
import * as zoneSchemas from '../schemas/zone';
import { db } from './db';

export async function update(input: zoneSchemas.updateZoneInput): Promise<APIResponse> {
    try {
        if (!input.id) {
            await db.mapzones.create({ data: input });
        } else {
            await db.mapzones.update({
                where: { id: input.id },
                data: input,
            });
        }
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
