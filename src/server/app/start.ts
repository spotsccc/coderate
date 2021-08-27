import { fastifyCookie, FastifyCookieOptions } from 'fastify-cookie'
import { FastifyInstance } from 'fastify'
import { flow } from 'fp-ts/function'
import postgres from 'fastify-postgres'
import * as Console from 'fp-ts/Console'
import fastifyStatic from 'fastify-static'
import { join } from 'path'
import { ValidationError } from '@server/shared/errors';
import { taskEither as TE, readerTaskEither as RTE } from 'fp-ts'
import { createConnectionString } from './db'
import { AppConfig } from './types'
import { readMyConfig, validateConfig } from './config'

export const startServer = (config: AppConfig) => (server: FastifyInstance) =>
	TE.tryCatch(async () => {
		server.register(postgres, {
			connectionString: createConnectionString(config),
		})
		server.addHook('onRoute', (routeOptions) => {
			console.dir(routeOptions, { depth: null })
		})
		server.register(fastifyStatic, {
			root: join(__dirname, '..', '..', '..', 'dist'),
		})
		server.register(fastifyCookie, {
			secret: 'my-secret',
			parseOptions: {},
		} as FastifyCookieOptions)

		server.setNotFoundHandler((req, res) => {
			res.sendFile('index.html')
		})

		server.get
		return server.listen(config.port)
	}, ValidationError.of)

export const start = flow(
	readMyConfig,
	validateConfig,
	RTE.fromEither,
	RTE.chain(startServer),
	RTE.match(Console.log, Console.log),
)
