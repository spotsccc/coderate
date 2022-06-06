import { either, option } from 'fp-ts'
import { NextApiRequest, NextApiResponse } from 'next'
import { Db } from 'mongodb'

import { NewUserData } from '@/server/user/lib'
import { LoginRequest } from '@/shared/api/auth'
import { Cookie } from '@/server/cookie'
import { Auth, AuthToken } from '@/server/auth'

export const signUpGuard = ({
	password,
	login,
	email,
}: NewUserData): either.Either<string, NewUserData> => {
	if (password.length < 8) {
		return either.left('Password should contains 8 or more symbols')
	}
	if (login.length < 4) {
		return either.left('Login should contains 4 or more symbols')
	}
	if (email.length < 5 || !email.includes('@') || !email.includes('.')) {
		return either.left('Email is invalid')
	}
	return either.right({ password, login, email })
}

export const loginGuard = ({
	password,
	loginOrEmail,
}: LoginRequest): either.Either<string, LoginRequest> => {
	if (password.length < 8) {
		return either.left('Password is too short')
	}
	if (loginOrEmail.length < 4) {
		return either.left('Email or login is too short')
	}
	return either.right({ password, loginOrEmail })
}

export const authGuard = async (
	database: Db,
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<either.Either<string, string>> => {
	if (!req.cookies['accessToken'] || !req.cookies['refreshToken']) {
		return either.left('Unauthorized')
	}
	const accessToken = JSON.parse(req.cookies['accessToken'])
	const refreshToken = JSON.parse(req.cookies['refreshToken'])
	const foundAccessToken = await Auth.getAccessToken(
		database,
		accessToken.tokenString,
	)
	if (
		option.isNone(foundAccessToken) ||
		Auth.isTokenExpires(foundAccessToken.value)
	) {
		const foundRefreshToken = await Auth.getRefreshToken(
			database,
			refreshToken.tokenString,
		)
		if (
			option.isNone(foundRefreshToken) ||
			Auth.isTokenExpires(foundRefreshToken.value)
		) {
			return either.left('Unauthorized')
		}
		await Promise.all([
			Auth.deleteRefreshToken(database, foundRefreshToken.value.tokenString),
			Auth.deleteAccessToken(database, accessToken.tokenString),
		])
		const insertedTokens = await Auth.generateAndInsertTokens(
			database,
			foundRefreshToken.value.userId,
		)
		if (either.isLeft(insertedTokens)) {
			return either.left("Can't authorize, try again later")
		}
		Cookie.setCookies(res, insertedTokens.right)
		return either.right(insertedTokens.right.accessToken.userId)
	}
	return either.right(accessToken.userId)
}
