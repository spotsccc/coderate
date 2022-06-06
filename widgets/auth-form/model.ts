import { attach, combine, createEvent, restore, sample, split } from 'effector'
import { API } from '@/shared/api'
import { Navigation } from '@/shared/lib/navigation'

export enum AuthFlow {
	login = 'login',
	signUp = 'signUp',
}

export const changeLoginOrEmail = createEvent<string>()
export const changeLogin = createEvent<string>()
export const changePassword = createEvent<string>()
export const changeEmail = createEvent<string>()
export const changeAuthFlow = createEvent<AuthFlow>()
export const submit = createEvent()

export const $loginOrEmail = restore(changeLoginOrEmail, '')
export const $login = restore(changeLogin, '')
export const $password = restore(changePassword, '')
export const $email = restore(changeEmail, '')
export const $authFlow = restore<AuthFlow>(changeAuthFlow, AuthFlow.login)

export const $signUpData = combine({
	login: $login,
	password: $password,
	email: $email,
})

export const $loginData = combine({
	loginOrEmail: $loginOrEmail,
	password: $password,
})

export const loginFx = attach({
	effect: API.Auth.loginFx,
	source: $loginData,
})

export const signUpFx = attach({
	effect: API.Auth.signUpFx,
	source: $signUpData,
})

export const $loading = combine(
	{
		loginLoading: loginFx.pending,
		signUpFx: signUpFx.pending,
	},
	({ loginLoading, signUpFx }) => loginLoading || signUpFx,
)

split({
	source: submit,
	match: $authFlow,
	cases: {
		[AuthFlow.signUp]: signUpFx,
		[AuthFlow.login]: loginFx,
	},
})

sample({
	clock: [signUpFx.done, loginFx.done],
	target: Navigation.pushFx.prepend(() => '/'),
})
