import { generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from '../router';

export const openApiDocument = generateOpenApiDocument(appRouter, {
    title: 'CS2Surf-CN API',
    version: '1.0.0',
    baseUrl: `http://${process.env.API_HOST}:${process.env.API_PORT || 3000}/`,
    description: 'API for holding all records and zones made in CS2Surf',
});

openApiDocument.servers = [];
