import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import asyncHandler from "express-async-handler";
import { createOpenApiExpressMiddleware } from 'trpc-openapi';
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { openApiDocument } from './openapi'
import { appRouter } from '../router';
const app = express();
// Setup CORS
app.use(cors());
app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(openApiDocument));
// Handle incoming OpenAPI requests
app.use('/api', createOpenApiExpressMiddleware({ router: appRouter }));
// Handle incoming OpenAPI requests
app.use("/", asyncHandler(createOpenApiExpressMiddleware({
    router: appRouter,
    createContext: ({ req }: CreateExpressContextOptions) => {
        const headers = new Headers();
        const cookies = [];
        for (const [key, value] of Object.entries(req.headers)) {
            if (value === undefined) continue;
            headers.set(key, value as string);
        }
        for (const [key, value] of Object.entries((req.cookies as unknown) ?? {})) {
            cookies.push({ name: key, value: value as string });
        }
        return { headers, cookies };
    },
    responseMeta: undefined,
    onError({ error, path }: { error: Error; path: string | undefined }) {
        console.error(`>>> TRPC Error on path: '${path}'`);
        console.error(error.stack);
    },
    maxBodySize: undefined,
})));
const PORT = 3000;
const HOST = '127.0.0.1';
app.listen(PORT, HOST, () => console.log(`OpenAPI Server is Listening on http://${HOST}:${PORT}`));