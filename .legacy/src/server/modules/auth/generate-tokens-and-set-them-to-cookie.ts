import { FastifyReply } from 'fastify'
import { flow } from 'fp-ts/function'
import { readerTaskEither as RTE } from 'fp-ts'
import { setCookies } from '@server/lib/cookies'
import { generateAccessToken } from '@server/modules/access-token'
import {
	generateRefreshToken,
	saveRefreshTokenToken,
} from '@server/modules/refresh-token'
import { AppConfig } from '@server/app/types'
import { User } from '@server/modules/users'

export const generateTokensAndSetThemToCookie =
	(config: AppConfig) => (rep: FastifyReply) =>
		flow(
			(u: User) => generateRefreshToken(u.id),
			saveRefreshTokenToken,
			RTE.map((refreshToken) => ({
				refreshToken: refreshToken.token,
				accessToken: generateAccessToken(config.jwt_secret)(refreshToken.id),
			})),
			RTE.chainIOK((tokens) =>
				setCookies(tokens as unknown as Record<string, string>)(rep),
			),
		)
