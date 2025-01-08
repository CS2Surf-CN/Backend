import { z } from 'zod';

export const apiGen = z.object({
    type: z.enum(['Invalid', 'Public', 'Updater']),
});
export type apiGenInput = z.infer<typeof apiGen>;
