import { z } from 'zod';

export const updateInfo = z.object({
    id: z.number().int().optional(),
    workshopid: z.number(),
    map: z.string(),
    tier: z.number().int(),
    maxvelocity: z.number(),
    limitPrespeed: z.boolean(),
});
export type updateInfoInput = z.infer<typeof updateInfo>;

export const pullInfo = z.object({
    workshopid: z.number(),
    mapname: z.string(),
});
export type pullInfoInput = z.infer<typeof pullInfo>;
