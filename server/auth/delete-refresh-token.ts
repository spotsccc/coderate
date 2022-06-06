import { Db, DeleteResult } from 'mongodb'
import { AuthToken } from './generate-tokens'

export const deleteRefreshToken = async (
	database: Db,
	token: string,
): Promise<DeleteResult> => {
	const refreshTokens = database.collection<AuthToken>('refreshTokens')
	return refreshTokens.deleteOne({ tokenString: token })
}
