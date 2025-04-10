import { z } from 'zod';

export const updateInfo = z.object({
    id: z.number().int().optional(),
    workshopid: z.number(),
    map: z.string(),
    tier: z.number().int(),
    maxvelocity: z.number(),
    limit_prespeed: z.boolean(),
});
export type updateInfoInput = z.infer<typeof updateInfo>;

export const pullInfo = z.object({
    workshopid: z.number(),
    mapname: z.string(),
});
export type pullInfoInput = z.infer<typeof pullInfo>;

export const updateZone = z.object({
    id: z.number().int().optional(),
    map: z.string(),
    track: z.number().int(),
    type: z.number().int(),
    value: z.number().int(),
    mins_x: z.number(),
    mins_y: z.number(),
    mins_z: z.number(),
    maxs_x: z.number(),
    maxs_y: z.number(),
    maxs_z: z.number(),
    des_pos_x: z.number().optional(),
    des_pos_y: z.number().optional(),
    des_pos_z: z.number().optional(),
    des_ang_x: z.number().optional(),
    des_ang_y: z.number().optional(),
    des_ang_z: z.number().optional(),
    flags: z.number().int().optional(),
    hammerid: z.number().int().optional(),
    hookname: z.string().optional(),
    limitspeed: z.number().optional(),
});
export type updateZoneInput = z.infer<typeof updateZone>;

export const pullZone = z.object({
    map: z.string(),
});
export type pullZoneInput = z.infer<typeof pullZone>;
