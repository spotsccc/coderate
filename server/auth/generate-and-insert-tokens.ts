import { Db } from 'mongodb'

import {
	generateAccessToken,
	generateRefreshToken,
	AuthToken,
} from './generate-tokens'
import { either } from 'fp-ts'

export const generateAndInsertTokens = async (
	database: Db,
	id: string,
): Promise<
	either.Either<string, { accessToken: AuthToken; refreshToken: AuthToken }>
> => {
	const accessToken = generateAccessToken(id)
	const refreshToken = generateRefreshToken(id)
	const accessTokens = database.collection('accessTokens')
	const insertedAccessTokenData = await accessTokens.insertOne(accessToken)
	if (insertedAccessTokenData === null) {
		return either.left("can't authorize, try again later")
	}
	const refreshTokens = database.collection('refreshTokens')
	const insertedRefreshTokenData = await refreshTokens.insertOne(refreshToken)
	if (insertedRefreshTokenData === null) {
		return either.left("can't authorize, try again later")
	}
	return either.right({ accessToken, refreshToken })
}
