import { TRPCError } from '@trpc/server';
import { APIResponse, successResponse } from '../utils/response';
import * as zoneSchemas from '../schemas/zone';
import { db } from './db';

export async function create(input: zoneSchemas.updateZoneInput): Promise<APIResponse> {
    const res = await db.mapzones.createMany({ data: input.data });

    if (!res) {
        throw new TRPCError({ code: 'BAD_REQUEST' });
    }

    return successResponse('');
}

export async function update(input: zoneSchemas.updateZoneInput): Promise<APIResponse> {
    try {
        const updatePromises = input.data.map(x => {
            return db.mapzones.update({
                where: { id: x.id },
                data: x
            });
        });

        await Promise.all(updatePromises);
    } catch (error) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: `${error}` });
    }

    return successResponse('');
}