import { FastifyInstance } from 'fastify'
import { ControllerOptions, Method, Routes } from './types'

export const createController =
	(options: ControllerOptions) =>
	(routes: Routes) =>
	(fastify: FastifyInstance) => {
		routes.forEach((route) => {
			const path = `/${options.url}/${route.path}`
			console.log(path)
			switch (route.method) {
				case Method.GET:
					fastify.get(path, route.handler)
				case Method.POST:
					fastify.post(path, route.handler)
				case Method.DELETE:
					fastify.delete(path, route.handler)
				case Method.PUT:
					fastify.put(path, route.handler)
			}
		})
	}
