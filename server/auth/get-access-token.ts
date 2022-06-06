import { Db } from 'mongodb'
import { option } from 'fp-ts'
import { AuthToken } from './generate-tokens'
import { pipe } from 'fp-ts/function'
import { mapId } from '@/shared/lib/mappers'

export const getAccessToken = async (
	database: Db,
	token: string,
): Promise<option.Option<AuthToken>> => {
	const accessTokens = database.collection<AuthToken>('accessTokens')
	return pipe(
		await accessTokens.findOne({ tokenString: token }),
		option.fromNullable,
		option.map(mapId),
	)
}
