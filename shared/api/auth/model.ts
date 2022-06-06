import { createEffect } from 'effector'
import { authRequest, baseRequest } from '@/shared/api/base-request'

export type LoginRequest = {
	loginOrEmail: string
	password: string
}

export type SignUpRequest = {
	login: string
	email: string
	password: string
}

export const loginFx = createEffect(async (loginReq: LoginRequest) => {
	const response = await authRequest({
		url: '/api/auth/login',
		cfg: {
			method: 'POST',
			body: JSON.stringify(loginReq),
		},
	})
	return response
})

export const signUpFx = createEffect(async (signUpReq: SignUpRequest) => {
	const response = await authRequest({
		url: '/api/auth/sign-up',
		cfg: {
			method: 'POST',
			body: JSON.stringify(signUpReq),
		},
	})
	return response
})
