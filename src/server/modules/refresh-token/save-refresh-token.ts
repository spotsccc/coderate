import { taskEither as TE } from 'fp-ts'
import { Database } from '@server/lib/controller/types'
import { DBNotFoundError } from '@server/shared/errors'
import { RefreshToken } from './types'

export const saveRefreshTokenToken =
	({ token, id, expires }: RefreshToken) =>
	(db: Database) =>
		TE.tryCatch(
			() =>
				db
					.query<RefreshToken>(
						'INSERT INTO refresh_tokens (id, user_id, expires) VALUES ($1, $2, $3)',
						[token, id, expires],
					)
					.then(() => ({ token, id, expires })),
			DBNotFoundError.of,
		)
