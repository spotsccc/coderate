import { FastifyRequest, FastifyReply } from 'fastify'
import { PostgresDb } from 'fastify-postgres'
import {readerTaskEither as RTE, option as O} from 'fp-ts'
import { AppConfig } from '@server/app/types'

import ReaderTaskEither = RTE.ReaderTaskEither

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

export type Route<Req = unknown, Err = unknown, Res = unknown> = Readonly<{
	path: string
	method: Method
	handler: ReaderTaskEither<Context, Err, Res>
}>

export type Database = {query: PostgresDb['query']}

export type Context<Req = unknown> = Readonly<{
	userId: O.Option<string>
	db: Database
	req: Req extends unknown ? FastifyRequest : FastifyRequest<{Body: Req}>
	rep: FastifyReply
	config: AppConfig
}>
