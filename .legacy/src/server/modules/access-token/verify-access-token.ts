import { either as E } from 'fp-ts'
import { verify } from 'jsonwebtoken'
import { AccessError } from '@server/shared/errors'

export const verifyAccessToken =
	(secret: string) =>
	(token: string): E.Either<Error, { id: string }> =>
		//@ts-ignore
		E.tryCatch(() => verify(token, secret), AccessError.of)