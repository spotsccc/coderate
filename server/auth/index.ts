import { generateAccessToken } from './generate-tokens'
import { generateAndSaveAccessToken } from './generate-and-save-access-token'
import { getAccessToken } from './get-access-token'
import { getRefreshToken } from './get-refresh-token'
import { isTokenExpires } from './is-token-expires'
import { deleteAccessToken } from './delete-access-token'
import { deleteRefreshToken } from './delete-refresh-token'
import { generateAndInsertTokens } from './generate-and-insert-tokens'

export type { AuthToken } from './generate-tokens'

export const Auth = {
	generateAccessToken,
	getRefreshToken,
	getAccessToken,
	generateAndSaveAccessToken,
	deleteRefreshToken,
	deleteAccessToken,
	generateAndInsertTokens,
	isTokenExpires,
}
