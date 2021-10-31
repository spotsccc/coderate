import { fastifyCookie } from 'fastify-cookie';
import { flow } from 'fp-ts/function';
import postgres from 'fastify-postgres';
import * as Console from 'fp-ts/Console';
import fastifyStatic from 'fastify-static';
import { join } from 'path';
import { ValidationError } from '@server/shared/errors';
import { taskEither as TE, readerTaskEither as RTE } from 'fp-ts';
import { createConnectionString } from './db';
import { readMyConfig, validateConfig } from './config';
export const startServer = (config) => (server) => TE.tryCatch(async () => {
    server.register(postgres, {
        connectionString: createConnectionString(config),
    });
    server.addHook('onRoute', (routeOptions) => {
        console.dir(routeOptions, { depth: null });
    });
    server.register(fastifyStatic, {
        root: join(__dirname, '..', '..', '..', 'dist'),
    });
    server.register(fastifyCookie, {
        secret: 'my-secret',
        parseOptions: {},
    });
    server.setNotFoundHandler((req, res) => {
        res.sendFile('index.html');
    });
    return server.listen(config.port);
}, ValidationError.of);
export const start = flow(readMyConfig, validateConfig, RTE.fromEither, RTE.chain(startServer), RTE.match(Console.log, Console.log));
//# sourceMappingURL=start.js.map