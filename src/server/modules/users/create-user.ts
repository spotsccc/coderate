import { pipe } from 'fp-ts/function'
import { task as T, taskEither as TE } from 'fp-ts'
import { randomUUID } from 'crypto'
import { hash, genSalt } from 'bcrypt'
import { DataBaseError } from '@server/shared/errors'
import { Database } from '@server/lib/controller'
import { CreateUserDTO, User } from './types'

export const createUser =
	(u: CreateUserDTO) => (db: Database) =>
		pipe(
			hashPassword(u.password),
			T.map((password) => ({ ...u, password })),
			TE.fromTask,
			TE.chain(({ password, login, email }) =>
				TE.tryCatch(
					() =>
						db
							.query<User>(
								'INSERT INTO users (login, password, email) VALUES ($1, $2, $3)',
								[login, password, email],
							)
							.then((res) => res.rows[0]),
					DataBaseError.of,
				),
			),
		)

export const hashPassword = (password: string) => pipe(
	() => genSalt(10),
	T.chain(salt => () => hash(password, salt))
)
