import { generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from '../router';

export const openApiDocument = generateOpenApiDocument(appRouter, {
    title: 'OpenAPI Documentation',
    version: '1.0.0',
    baseUrl: `http://${process.env.API_HOST}:${process.env.API_PORT || 3000}/`,
});
