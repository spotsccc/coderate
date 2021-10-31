import { AuthState } from '@client/widgets/auth-form/model'

export type Option = {
	text: string
	id: AuthState
}

export const options = [
	{
		id: AuthState.login,
		text: 'Login',
	},
	{
		id: AuthState.signUp,
		text: 'Sign up',
	},
]

export const optionsById = {
	[AuthState.login]: {
		id: AuthState.login,
		text: 'Login',
	},
	[AuthState.signUp]: {
		id: AuthState.signUp,
		text: 'Sign up',
	},
}

export const getOptionById =
	(options: Record<AuthState, Option>) => (id: AuthState) =>
		options[id]
export const getOptionText = (option: Option) => option.text
