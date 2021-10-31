import { FastifyInstance } from 'fastify'
import { taskEither as TE, option as O } from 'fp-ts'
import { ControllerOptions, Method, Routes } from './types'

export type Result<Error = unknown, Res = unknown> = Readonly<{
	error?: Error
	response?: Res
}>

export const createController =
	(options: ControllerOptions) =>
	(routes: Routes) =>
	(fastify: FastifyInstance) => {
		routes.forEach((route) => {
			const path = `/${options.url}/${route.path}`
			switch (route.method) {
				case Method.GET:
					fastify.get(path, (req, rep) =>
						TE.match(
							(error): Result => {
								console.log(error)
								throw new Error()
							},
							(response): Result => ({
								response: response,
							}),
						)(
							route.handler({
								db: fastify.pg,
								req,
								rep,
								config: {
									jwt_secret: 'secret',
								} as any,
								userId: O.none,
							}),
						)(),
					)
					break
				case Method.POST:
					fastify.post(path, (req, rep) =>
						TE.match(
							(error): Result => {
								console.log(error)
								throw new Error()
							},
							(response): Result => ({
								response: response,
							}),
						)(
							route.handler({
								db: fastify.pg,
								req,
								rep,
								config: {
									jwt_secret: 'secret',
								} as any,
								userId: O.none,
							}),
						)(),
					)
					break
				case Method.DELETE:
					fastify.delete(path, (req, rep) =>
						TE.match(
							(error): Result => {
								console.log(error)
								return {
									error: (error as Error).message,
								}
							},
							(response): Result => ({
								response: response,
							}),
						)(
							route.handler({
								db: fastify.pg,
								req,
								rep,
								config: {
									jwt_secret: 'secret',
								} as any,
								userId: O.none,
							}),
						)(),
					)
					break
				case Method.PUT:
					fastify.put(path, (req, rep) =>
						TE.match(
							(error): Result => {
								console.log(error)
								return {
									error: (error as Error).message,
								}
							},
							(response): Result => ({
								response: response,
							}),
						)(
							route.handler({
								db: fastify.pg,
								req,
								rep,
								config: {
									jwt_secret: 'secret',
								} as any,
								userId: O.none,
							}),
						)(),
					)
					break
			}
		})
	}
