import { FastifyInstance, RouteOptions } from "fastify"
import { createConnectionString } from "./db"
import { AppConfig } from "./types"
import { flow } from "fp-ts/function"
import postgres from 'fastify-postgres'
import * as TE from 'fp-ts/TaskEither'
import * as RTE from 'fp-ts/ReaderTaskEither'
import * as Console from 'fp-ts/Console'
import { readMyConfig, validateConfig } from "./config"
import { ValidationError } from "./errors"
import fastifyStatic from 'fastify-static'
import {join} from 'path'

export const startServer = (config: AppConfig) => (server: FastifyInstance) =>
	TE.tryCatch(async () => {
		server.register(postgres, {
			connectionString: createConnectionString(config),
		})
		server.addHook('onRoute', routeOptions => {
			console.dir(routeOptions, { depth: null})
		})
		server.register(fastifyStatic, {
				root: join(__dirname, '..', '..', '..', 'dist')
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
