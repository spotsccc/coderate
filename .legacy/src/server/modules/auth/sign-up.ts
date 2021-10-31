import { pipe } from 'fp-ts/function'
import { readerTaskEither as RTE } from 'fp-ts'
import { Context } from '@server/lib/controller/types'
import { createUser, getUserByLogin } from '@server/modules/users'
import { generateTokensAndSetThemToCookie } from './generate-tokens-and-set-them-to-cookie'

export const signUp = ({ req, config, rep, db }: Context) =>
	pipe(
		createUser(req.body as any),
		RTE.chain(() => getUserByLogin((req.body as any).login)),
		RTE.chain(generateTokensAndSetThemToCookie(config)(rep)),
	)(db)
