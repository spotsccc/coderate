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


export type AuthFormProps = {} & AuthFormState
