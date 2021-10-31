import {
	createEvent,
	restore,
	combine,
	guard,
	split,
	createStore,
} from 'effector'
import { login, signUp } from '@/shared/lib/api'
import {
	checkEmail,
	checkLogin,
	checkPassword,
	checkRepeatPassword,
	validateForm,
} from '@/widgets/auth-form/model/check-valid-helpers'
import { flow } from 'fp-ts/function'
import { not } from '@/shared/lib/fp'
import { splitFt } from '@/shared/lib/effector/match'

export enum AuthState {
	login = 'login',
	signUp = 'signUp',
}

export type AuthFormState = {
	login: string
	email: string
	password: string
	authState: AuthState
	repeatPassword: string
}

export const changePassword = createEvent<string>()
const setPasswordHasError = createEvent()
export const changeEmail = createEvent<string>()
const setEmailHasError = createEvent()
export const changeRepeatPassword = createEvent<string>()
const setRepeatPasswordHasError = createEvent()
export const changeLogin = createEvent<string>()
const setLoginHasError = createEvent()
export const changeAuthState = createEvent<AuthState>()
export const trySubmitForm = createEvent()
export const submitForm = createEvent<AuthFormState>()

export const $password = restore(changePassword, '')
export const $repeatPassword = restore(changeRepeatPassword, '').reset(
	changeAuthState,
)
export const $login = restore(changeLogin, '')
export const $email = restore(changeEmail, '')
export const $authState = restore(changeAuthState, AuthState.login)
export const $loginHasError = createStore(false)
export const $passwordHasError = createStore(false)
export const $emailHasError = createStore(false)
export const $repeatPasswordHasError = createStore(false)

$emailHasError
	.reset(changeEmail)
	.reset(changeAuthState)
	.on(setEmailHasError, () => true)
$repeatPasswordHasError
	.reset(changeRepeatPassword)
	.reset(changeAuthState)
	.on(setRepeatPasswordHasError, () => true)
$passwordHasError
	.reset(changePassword)
	.reset(changeAuthState)
	.on(setPasswordHasError, () => true)
$loginHasError
	.reset(changeLogin)
	.reset(changeAuthState)
	.on(setLoginHasError, () => true)

export const $authFormState = combine({
	login: $login,
	email: $email,
	password: $password,
	repeatPassword: $repeatPassword,
	authState: $authState,
})

splitFt({
	source: trySubmitForm,
	match: {
		loginHasError: $authFormState.map(flow(checkLogin, not)),
		repeatPasswordHasError: $authFormState.map(
			flow(checkRepeatPassword, not),
		),
		emailHasError: $authFormState.map(flow(checkEmail, not)),
		passwordHasError: $authFormState.map(flow(checkPassword, not)),
	},
	cases: {
		loginHasError: setLoginHasError,
		passwordHasError: setPasswordHasError,
		repeatPasswordHasError: setRepeatPasswordHasError,
		emailHasError: setEmailHasError,
	},
})

guard({
	clock: trySubmitForm,
	source: $authFormState,
	filter: validateForm,
	target: submitForm,
})

split({
	source: submitForm,
	match: $authState,
	cases: {
		[AuthState.login]: login.prepend((payload) => ({ body: payload })),
		[AuthState.signUp]: signUp.prepend((payload) => ({ body: payload })),
	},
})
