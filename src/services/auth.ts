import { TRPCError } from '@trpc/server';
import { APIResponse, successResponse } from '../utils/response';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { db } from './db'
import { APIKeyType } from '../../prisma/generated';

export interface JWTPayload {
    api_key: string;
}

export async function status(req: Request): Promise<APIResponse> {
    const apiKey = req.headers.authorization;

    if (!apiKey) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const data = await db.credential.findUnique({
        where: {
            type: APIKeyType.Public,
            key: apiKey
        }
    });

    if (!data) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const token = jwt.sign({ api_key: apiKey }, process.env.JWT_TOKEN_SECURE!, { expiresIn: '30d' });
    return successResponse(token);
}

export async function zone(req: Request): Promise<APIResponse> {
    const apiKey = req.headers.authorization;

    if (!apiKey) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const data = await db.credential.findUnique({
        where: {
            type: APIKeyType.ZoneHelper,
            key: apiKey
        }
    });

    if (!data) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const token = jwt.sign({ api_key: apiKey }, process.env.JWT_TOKEN_SECURE!, { expiresIn: '30d' });
    return successResponse(token);
}
