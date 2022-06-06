import { Db } from 'mongodb'
import { pipe } from 'fp-ts/function'
import { option } from 'fp-ts'
import { mapId } from '@/shared/lib/mappers'
import { AuthToken } from './generate-tokens'

export const getRefreshToken = async (
	database: Db,
	token: string,
): Promise<option.Option<AuthToken>> => {
	const refreshTokens = database.collection<AuthToken>('refreshTokens')
	return pipe(
		await refreshTokens.findOne({ tokenString: token }),
		option.fromNullable,
		option.map(mapId),
	)
}
