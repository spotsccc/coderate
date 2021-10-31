import { Methods, createSafeApiCall } from './model'

export const { call: login, callFx: loginFx } = createSafeApiCall(
	'auth/login',
	Methods.POST,
)
export const { callFx: signUpFx, call: signUp } = createSafeApiCall(
	'auth/sign-up',
	Methods.POST,
)
