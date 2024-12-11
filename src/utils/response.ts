import { z } from 'zod';
import { CustomErr } from './errcodes';

export const responseSchema = z.object({
    code: z.number(),
    message: z.string(),
    data: z.any(),
    timestamp: z.number(),
});
export type APIResponse = z.infer<typeof responseSchema>;

export const createResponse = (data: any, message: string = 'success', code: number = 200): APIResponse => {
    return {
        code,
        message,
        data,
        timestamp: Math.floor(Date.now() / 1000),
    };
};

export const successResponse = (data: any, message: string = 'success'): APIResponse => {
    return {
        code: 200,
        message,
        data,
        timestamp: Math.floor(Date.now() / 1000),
    };
};

export const failedResponse = (data: any, message: string = 'error', code?: number): APIResponse => {
    return {
        code: code ?? 404,
        message,
        data,
        timestamp: Math.floor(Date.now() / 1000),
    };
};

export const failedResponseWithCustomErr = (customErr: CustomErr, data?: any): APIResponse => {
    return {
        code: customErr.errCode,
        message: customErr.msg,
        data,
        timestamp: Math.floor(Date.now() / 1000),
    };
};
