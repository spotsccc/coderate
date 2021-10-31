import { pipe } from 'fp-ts/function'
import { taskEither as TE, option as O, array as A, either as E } from 'fp-ts'
import { Database } from '@server/lib/controller'
import { DataBaseError, DBNotFoundError } from '@server/shared/errors'
import { RefreshToken } from './types'

export const getRefreshToken = (db: Database) => (tokenId: string) =>
	pipe(
		TE.tryCatch(
			() =>
				db.query<{ user_id: string; expires: string; id: string }>(
					'SELECT * from refresh_tokens WHERE id = $1',
					[tokenId],
				),
			DataBaseError.of,
		),
		TE.map((res) => A.head(res.rows)),
		TE.chainEitherKW(
			O.match(
				() => E.left(new DBNotFoundError('Refresh token not found')),
				({ user_id, expires, id }) =>
					E.right({ id: user_id, token: id, expires: new Date(expires) }),
			),
		),
	)
