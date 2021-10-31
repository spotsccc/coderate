import { pipe } from 'fp-ts/function'
import { taskEither as TE } from 'fp-ts'
import { Context } from '@server/lib/controller/types'
import { verifyTokens } from '@server/modules/refresh-token/verify-tokens'
import { setCookies } from '@server/lib/cookies'

export const testHandler = (context: Context) =>
	pipe(
		verifyTokens(context),
		TE.chainIOK((tokens) =>
			setCookies(tokens as unknown as Record<string, string>)(context.rep),
		),
		TE.map(() => ({data: 'dadada'}))
	)
