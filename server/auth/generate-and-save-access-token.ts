import { either } from 'fp-ts'
import { Db } from 'mongodb'
import { generateAccessToken } from './generate-tokens'

export const generateAndSaveAccessToken = async (database: Db, id: string) => {
	const accessToken = generateAccessToken(id)
	const accessTokens = database.collection('accessTokens')
	const insertedAccessTokenData = await accessTokens.insertOne(accessToken)
	if (insertedAccessTokenData === null) {
		return either.left("can't authorize, try again later")
	}
	return either.right(accessToken)
}
