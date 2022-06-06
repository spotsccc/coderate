import { isBefore } from 'date-fns'
import { AuthToken } from './generate-tokens'

export const isTokenExpires = (token: AuthToken): boolean =>
	isBefore(token.expires, new Date())
