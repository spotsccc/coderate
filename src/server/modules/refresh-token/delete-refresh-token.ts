import { taskEither as TE, option as O, either as E, array as A } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import { Database } from '@server/lib/controller'
import { DataBaseError, DBNotFoundError } from '@server/shared/errors'
import { RefreshToken } from '.'

export const deleteRefreshToken = (db: Database) => (tokenId: string) =>
	pipe(
		TE.tryCatch(
			() =>
				db.query<RefreshToken>('DELETE from refresh_tokens WHERE id = $1', [
					tokenId,
				]),
			DataBaseError.of,
		),
		TE.map((res) => {
			console.dir(res, {depth: null})
			return res
		}),
		TE.map((res) => A.head(res.rows)),
		TE.map(
			O.match(
				() => E.left(new DBNotFoundError('Refresh token not found')),
				(res) => E.right({ ...res, expires: new Date(res.expires) }),
			),
		),
	)
