import { taskEither as TE, task as T } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import { eitherFromBoolean } from '@server/lib/fp'
import { AccessError } from '@server/shared/errors'
import { CreateUserDTO, User } from './types'
import { hashPassword } from './create-user'

export const verifyPassword = (password: string) => (hash: string) =>
	pipe(
		password,
		hashPassword,
		T.map((hp) => hp === hash),
	)

export const verifyUserPassword =
	(cu: CreateUserDTO) =>
	(u: User): TE.TaskEither<AccessError, User> =>
		pipe(
			verifyPassword(cu.password)(u.password),
			TE.fromTask,
			TE.chainEitherK(
				eitherFromBoolean(new AccessError('wrong password')),
			),
			TE.map(() => u),
		)
