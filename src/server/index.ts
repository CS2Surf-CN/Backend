import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import asyncHandler from 'express-async-handler';
import { createOpenApiExpressMiddleware } from 'trpc-openapi';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

import { openApiDocument } from './openapi';
import { appRouter } from '../router';
import { inferAsyncReturnType } from '@trpc/server';
import { MyTRPCError } from '../utils/errcodes';
import { failedResponse } from '../utils/response';

import 'dotenv/config';

// Extend BigInt prototype with toJSON method
declare global {
    interface BigInt {
        toJSON(): string;
    }
}

BigInt.prototype.toJSON = function () {
    return this.toString();
};

const app = express();

// Setup CORS
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    // Setup Swagger UI
    app.use('/', swaggerUi.serve);
    app.get('/', swaggerUi.setup(openApiDocument));
}

// Create Express Context
const createContext = ({ req, res }: CreateExpressContextOptions) => {
    return { req, res };
};

export type Context = inferAsyncReturnType<typeof createContext>;

// Handle incoming OpenAPI requests
app.use(
    '/',
    asyncHandler(
        createOpenApiExpressMiddleware({
            router: appRouter,
            createContext,
            responseMeta: undefined,
            onError({ error, path, ctx }) {
                // 不拦截 MyTRPCError，交由“express全局拦截函数”专门处理
                if (error.cause instanceof MyTRPCError) {
                    console.warn(`>>> My TRPC Error on path: '${path}'`);
                    console.warn(error.stack);
                    throw error;
                }
                if (path) {
                    if (error.code === 'UNAUTHORIZED') {
                        return;
                    }

                    console.error(`>>> TRPC Error on path: '${path}'`);
                    console.error(error.stack);
                }
                // 不拦截 TRPCError ZodError，走createOpenApiExpressMiddleware默认处理
            },
            maxBodySize: undefined,
        })
    )
);

// express全局拦截函数：专门处理 MyTRPCError
app.use((err: any, req: any, res: any, next: any) => {
    return res?.status(200).json(failedResponse(null, err.cause.message, err.cause.code));
});

const PORT = Number(process.env.API_PORT) || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => console.log(`OpenAPI Server is Listening on http://${HOST}:${PORT}`));

process.on('uncaughtException', (error) => console.error('uncaughtException', error));
