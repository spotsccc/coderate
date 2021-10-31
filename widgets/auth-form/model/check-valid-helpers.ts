import { AuthFormState, AuthState } from './auth-from-state'

export const checkPassword = ({ password }: AuthFormState) =>
	password.length > 6
export const checkEmail = ({ email }: AuthFormState) => email.length > 3
export const checkRepeatPassword = ({
	password,
	repeatPassword,
}: AuthFormState) => password === repeatPassword && password.length > 6
export const checkLogin = ({ login }: AuthFormState) => login.length > 3
export const validateForm = (formState: AuthFormState) =>
	formState.authState === AuthState.login
		? checkEmail(formState) &&
		  checkPassword(formState) &&
		  checkLogin(formState)
		: checkEmail(formState) &&
		  checkRepeatPassword(formState) &&
		  checkPassword(formState) &&
		  checkLogin(formState)
