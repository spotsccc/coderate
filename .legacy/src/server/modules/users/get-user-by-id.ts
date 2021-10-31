import * as A from 'fp-ts/Array'
import { either as E, option as O, taskEither as TE } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import { DBNotFoundError, DataBaseError } from '@server/shared/errors'
import { Database } from '@server/lib/controller/types'
import { User } from './types'

export const getUserById =
	(id: number) => (db: Database) =>
		pipe(
			TE.tryCatch(
				() =>
					db
						.query<User>('SELECT * FROM users WHERE id = $1', [id])
						.then((res) => A.head(res.rows)),
				DataBaseError.of,
			),
			TE.chainEitherK(
				O.match(
					() => E.left(new DBNotFoundError('User not found')),
					(user) => E.right(user),
				),
			),
		)
