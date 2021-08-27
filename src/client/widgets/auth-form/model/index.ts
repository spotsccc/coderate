import {
	createEvent,
	restore,
	combine,
	createEffect,
	guard,
	split,
	createStore,
	sample,
} from 'effector'
import { AuthState, AuthFormState } from '../types'
import { login as loginApi, signUp, test } from '@client/shared/api'

export const changePassword = createEvent<string>('changePassword')
export const changeEmail = createEvent<string>()
export const changeRepeatPassword = createEvent<string>()
export const changeLogin = createEvent<string>()
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
	.reset(changeLogin)
	.reset(changeAuthState)
export const $passwordHasError = createStore(false)
	.reset(changePassword)
	.reset(changeAuthState)
export const $emailHasError = createStore(false)
	.reset(changeEmail)
	.reset(changeAuthState)
export const $repeatPasswordHasError = createStore(false)
	.reset(changeRepeatPassword)
	.reset(changeAuthState)

export const $authFormState = combine({
	login: $login,
	email: $email,
	password: $password,
	repeatPassword: $repeatPassword,
	authState: $authState,
})

sample({
	clock: trySubmitForm,
	source: $authFormState,
	fn: ({ login }) => login.length < 3,
	target: $loginHasError,
})

sample({
	clock: trySubmitForm,
	source: $authFormState,
	fn: ({ password }) => password.length < 6,
	target: $passwordHasError,
})

sample({
	clock: trySubmitForm,
	source: $authFormState,
	fn: ({ email }) => email.length < 3,
	target: $emailHasError,
})

sample({
	clock: trySubmitForm,
	source: $authFormState,
	fn: ({ password, repeatPassword }) =>
		password !== repeatPassword || password.length < 6,
	target: $repeatPasswordHasError,
})

export const loginFx = createEffect(
	({ login, password, email }: AuthFormState) =>
		loginApi({ login, password, email }),
)
export const signUpFx = createEffect(
	({ login, password, email }: AuthFormState) =>
		signUp({ login, password, email }),
)

export const testFx = createEffect(() => test())

const isFormValid = (state: AuthFormState) =>
	state.authState === AuthState.login
		? state.login.length > 0 &&
		  state.email.length > 0 &&
		  state.password.length > 0
		: state.login.length > 0 &&
		  state.email.length > 0 &&
		  state.password.length > 0 &&
		  state.password === state.repeatPassword

guard({
	clock: trySubmitForm,
	source: $authFormState,
	filter: isFormValid,
	target: submitForm,
})

split({
	source: submitForm,
	match: $authState,
	cases: {
		[AuthState.login]: loginFx,
		[AuthState.signUp]: signUpFx,
	},
})
