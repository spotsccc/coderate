import { Db, DeleteResult } from 'mongodb'
import { AuthToken } from './generate-tokens'

export const deleteAccessToken = async (
	database: Db,
	token: string,
): Promise<DeleteResult> => {
	const accessTokens = database.collection<AuthToken>('accessTokens')
	return accessTokens.deleteOne({ tokenString: token })
}
