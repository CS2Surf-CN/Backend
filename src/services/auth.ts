import { TRPCError } from '@trpc/server';
import { APIResponse, successResponse } from '../utils/response';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { db } from './db'
import { APIKeyType } from '../../prisma/generated';
import { randomBytes } from 'crypto';
import { apiGenInput } from '../schemas/auth'

export interface JWTPayload {
    api_key: string;
}

export async function gen(input: apiGenInput, req: Request): Promise<APIResponse> {
    const token = req.header('authorization')?.split('Bearer ')[1];
    if (!token || token !== process.env.API_TOKEN_SECURE) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const generateToken = (length: number): string => {
        return randomBytes(length).toString('hex').match(/.{1,16}/g)?.join('-') || '';
    };

    const api_key = generateToken(16);

    try {
        const res = await db.credential.create({
            data: {
                type: input.type,
                key: api_key
            }
        })

        if (!res) {
            throw new Error(`Failed to create api_key: ${api_key}, type: ${input.type}`);
        }
    } catch (error) {
        console.error(error);
        throw new TRPCError({ code: 'BAD_REQUEST' });
    }

    return successResponse(api_key);
}

export async function status(req: Request): Promise<APIResponse> {
    const apiKey = req.header('authorization')?.split('Bearer ')[1];

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
    const apiKey = req.header('authorization')?.split('Bearer ')[1];

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


