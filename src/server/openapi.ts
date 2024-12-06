import { generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from '../router';
export const openApiDocument = generateOpenApiDocument(appRouter, {
    title: 'OpenAPI Documentation',
    version: '1.0.0',
    baseUrl: 'http://localhost:3000/api',
});