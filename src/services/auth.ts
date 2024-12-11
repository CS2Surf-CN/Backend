import { TRPCError } from '@trpc/server';
import { APIResponse, successResponse } from '../utils/response';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { db } from './db'
import { APIKeyType } from '../../prisma/generated';

export interface JWTPayload {
    api_key: string;
}

export async function login(req: Request): Promise<APIResponse> {
    const apiKey = req.headers.authorization;

    if (!apiKey) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const data = await db.credential.findUnique({ where: { key: apiKey } });
    if (!data) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    if (data.type === APIKeyType.Invalid) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid key" });
    }

    const token = jwt.sign({ api_key: apiKey }, process.env.JWT_TOKEN_SECURE!, { expiresIn: '30d' });
    return successResponse(token);
}
