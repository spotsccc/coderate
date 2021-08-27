import { pipe } from 'fp-ts/function'
import { either as E, taskEither as TE, task as T } from 'fp-ts'
import { Context } from '@server/lib/controller'
import {
	verifyAccessToken,
	generateAccessToken,
} from '@server/modules/access-token'
import { generateRefreshToken } from './generate-refresh-token'
import { saveRefreshTokenToken } from './save-refresh-token'
import { deleteRefreshToken } from './delete-refresh-token'
import { getRefreshToken } from './get-refresh-token-by-id'
import { isRefreshTokenValid } from './is-refresh-token-valid'
import {
	AccessError,
	DataBaseError,
	DBNotFoundError,
} from '@server/shared/errors'

export const verifyTokens = ({ req, config, db }: Context) =>
	pipe(
		verifyAccessToken(config.jwt_secret)(req.cookies.accessToken as string),
		E.map(({ id }) => id),
		TE.fromEither,
		TE.match(
			() =>
				pipe(
					getRefreshToken(db)(req.cookies.refreshToken as string),
					TE.chainEitherK(isRefreshTokenValid),
					TE.chainW((t) =>
						pipe(
							deleteRefreshToken(db)(t.token),
							TE.map(() => generateRefreshToken(t.id)),
						),
					),
					TE.chain((t) => saveRefreshTokenToken(t)(db)),
					TE.map((t) => ({
						refreshToken: t.token,
						accessToken: generateAccessToken(config.jwt_secret)(t.id),
					})),
				),
			() =>
				TE.rightTask(
					T.of({
						accessToken: req.cookies.accessToken as string,
						refreshToken: req.cookies.refreshToken as string,
					}),
				),
		),
		TE.fromTask,
		TE.flatten,
	)
