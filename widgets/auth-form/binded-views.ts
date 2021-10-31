import { reflect } from '@effector/reflect'
import { flow } from 'fp-ts/function'

import { Input, InputType } from '@/shared/ui/input'
import { getValue } from '@/shared/lib/fp'
import { Button } from '@/shared/ui/button'
import { TabBar, TabBarProps } from '@/shared/ui/tab-bar'

import {
	getOptionById,
	getOptionText,
	options,
	optionsById,
} from './auth-state-options'
import {
	$authState,
	$email,
	$emailHasError,
	$login,
	$loginHasError,
	$password,
	$passwordHasError,
	$repeatPassword,
	$repeatPasswordHasError,
	AuthState,
	changeAuthState,
	changeEmail,
	changeLogin,
	changePassword,
	changeRepeatPassword,
	trySubmitForm,
} from './model'

export const bindedViews = {
	AuthStateBar: reflect<TabBarProps<AuthState>>({
		view: TabBar,
		bind: {
			onButtonClick: changeAuthState,
			options,
			selectedOption: $authState,
		},
	}),
	Login: reflect({
		view: Input,
		bind: {
			value: $login,
			onChange: changeLogin.prepend(getValue),
			placeholder: 'your login',
			hasError: $loginHasError,
			errorText: 'invalid login',
		},
	}),
	RepeatPassword: reflect({
		view: Input,
		bind: {
			value: $repeatPassword,
			onChange: changeRepeatPassword.prepend(getValue),
			placeholder: 'repeat password',
			type: InputType.password,
			hasError: $repeatPasswordHasError,
			errorText: 'passwords should exist and be equals',
		},
	}),
	Email: reflect({
		view: Input,
		bind: {
			value: $email,
			onChange: changeEmail.prepend(getValue),
			placeholder: 'email@example.com',
			hasError: $emailHasError,
			errorText: 'invalid email',
		},
	}),
	Password: reflect({
		view: Input,
		bind: {
			value: $password,
			onChange: changePassword.prepend(getValue),
			placeholder: 'password',
			type: InputType.password,
			hasError: $passwordHasError,
			errorText: 'invalid password',
		},
	}),
	SubmitButton: reflect({
		view: Button,
		bind: {
			onClick: trySubmitForm.prepend(() => null),
			text: $authState.map(flow(getOptionById(optionsById), getOptionText)),
		},
	}),
}
