import { readerTaskEither as RTE } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import { Context } from '@server/lib/controller/types'
import { getUserByLogin } from '@server/modules/users'
import { LoginBody } from './types'
import { generateTokensAndSetThemToCookie } from './generate-tokens-and-set-them-to-cookie'

export const login = ({ req, rep, db, config }: Context<LoginBody>) => {
	return pipe(
		getUserByLogin((req.body as any).login),
		RTE.chain(generateTokensAndSetThemToCookie(config)(rep)),
	)(db)
}
