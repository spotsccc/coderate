import { FastifyRequest, FastifyReply } from "fastify"

export type ControllerOptions = Readonly<{
	url: string
}>

export type Routes = ReadonlyArray<Route>

export enum Method {
	GET = 'GET',
	POST = 'POST',
	DELETE = 'DELETE',
	PUT = 'PUT',
}

export type Route = Readonly<{
	path: string
	method: Method
	handler: (
		request: FastifyRequest,
		reply: FastifyReply,
	) => Promise<unknown> | void
}>
