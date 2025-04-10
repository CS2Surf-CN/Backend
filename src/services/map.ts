import { TRPCError } from '@trpc/server';
import { APIResponse, failedResponse, successResponse } from '../utils/response';
import * as mapSchemas from '../schemas/map';
import { db } from './db';

export async function info_update(input: mapSchemas.updateInfoInput): Promise<APIResponse> {
    try {
        if (!input.id) {
            await db.mapInfo.create({ data: input });
        } else {
            await db.mapInfo.update({
                where: { id: input.id },
                data: input,
            });
        }
    } catch (error) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: `${error}` });
    }

    return successResponse('');
}

export async function info_pull(input: mapSchemas.pullInfoInput): Promise<APIResponse> {
    const res = await db.mapInfo.findFirst({
        where: {
            workshopid: input.workshopid,
            map: input.mapname,
        },
    });

    if (!res) {
        return failedResponse(`Map not found! workshop: ${input.workshopid}, map: ${input.mapname}`);
    }

    return successResponse(res);
}

export async function zone_update(input: mapSchemas.updateZoneInput): Promise<APIResponse> {
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

export async function zone_delete(input: mapSchemas.deleteZoneInput): Promise<APIResponse> {
    try {
        await db.mapzones.delete({ where: { id: input.id } });
    } catch (error) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: `${error}` });
    }

    return successResponse('');
}

export async function zone_delete_all(input: mapSchemas.deleteAllZoneInput): Promise<APIResponse> {
    try {
        await db.mapzones.deleteMany({ where: { map: input.map } });
    } catch (error) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: `${error}` });
    }

    return successResponse('');
}

export async function zone_pull(input: mapSchemas.pullZoneInput): Promise<APIResponse> {
    const data = await db.mapzones.findMany({
        where: {
            map: input.map,
        },
    });
    console.log(data[0]);

    if (!data) {
        throw new TRPCError({ code: 'BAD_REQUEST' });
    }

    return successResponse(data);
}
