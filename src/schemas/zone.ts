import { z } from 'zod';

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
    des_x: z.number().optional(),
    des_y: z.number().optional(),
    des_z: z.number().optional(),
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
