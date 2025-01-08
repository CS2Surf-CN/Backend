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
