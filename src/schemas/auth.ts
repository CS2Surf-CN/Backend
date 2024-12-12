import { z } from 'zod';

export const apiGen = z.object({
    type: z.enum(['Invalid', 'Public', 'ZoneHelper']),
});
export type apiGenInput = z.infer<typeof apiGen>;
