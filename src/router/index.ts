import { z } from 'zod';
import { procedure, router } from '../server/trpc'

export const appRouter = router({
  hello: procedure
        .meta({ openapi: { method: "GET", path: "/hello" }, })
        .input(z.object({}))
        .output(z.string())
        .query(() => {
            return "Hello World!";
        }),
    protected: procedure
        .meta({ openapi: { method: "GET", path: "/protected", protect: true }, })
        .input(z.object({}))
        .output(z.string())
        .query(() => {
            return "Hello World!";
        }),
});