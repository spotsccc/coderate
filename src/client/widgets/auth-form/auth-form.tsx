import React from 'react'
import { Input, InputType } from '@client/shared/ui/input'
import { reflect } from '@effector/reflect'
import { Button } from '@client/shared/ui/button'
import {
	$password,
	changePassword,
	$email,
	changeEmail,
	$login,
	changeLogin,
	trySubmitForm,
	changeAuthState,
	$authState,
	$repeatPassword,
	changeRepeatPassword,
	testFx,
	$loginHasError,
	$passwordHasError,
	$repeatPasswordHasError,
	$emailHasError,
} from './model'
import { getValue } from '@client/shared/lib/handlers/get-value'
import styled from 'styled-components'
import { TabBar, TabBarProps } from '@client/shared/ui/tab-bar'
import { AuthState } from './types'
import { renderIf } from '@client/shared/lib/wrappers'

const Login = reflect({
	view: Input,
	bind: {
		value: $login,
		onChange: changeLogin.prepend(getValue),
		placeholder: 'your login',
		hasError: $loginHasError,
		errorText: 'invalid login',
	},
})

const RepeatPassword = reflect({
	view: renderIf(Input),
	bind: {
		value: $repeatPassword,
		onChange: changeRepeatPassword.prepend(getValue),
		placeholder: 'repeat password',
		type: InputType.password,
		renderIf: $authState.map((s) => s === AuthState.signUp),
		hasError: $repeatPasswordHasError,
		errorText: 'passwords should exist and be equals',
	},
})

const Email = reflect({
	view: Input,
	bind: {
		value: $email,
		onChange: changeEmail.prepend(getValue),
		placeholder: 'email@example.com',
		hasError: $emailHasError,
		errorText: 'invalid email',
	},
})

const Password = reflect({
	view: Input,
	bind: {
		value: $password,
		onChange: changePassword.prepend(getValue),
		placeholder: 'password',
		type: InputType.password,
		hasError: $passwordHasError,
		errorText: 'invalid password',
	},
})

const SubmitButton = reflect({
	view: Button,
	bind: {
		onClick: trySubmitForm,
		text: $authState.map((s) => (s === AuthState.login ? 'Login' : 'Sign up')),
	},
})

const options = [
	{
		id: AuthState.login,
		text: 'Login',
	},
	{
		id: AuthState.signUp,
		text: 'Sign up',
	},
]

const AuthStateBar = reflect<TabBarProps<AuthState>>({
	view: TabBar,
	bind: {
		onButtonClick: changeAuthState,
		options,
		selectedOption: $authState,
	},
})

const Form = styled.form`
	display: grid;
	grid-template-rows: 60px;
	grid-auto-rows: max-content;
	row-gap: 20px;
	box-sizing: border-box;
	padding: 40px;
	position: absolute;
	border: 1px solid black;
	border-radius: 4px;
	left: calc(50% - 180px);
	top: calc(50% - 220px);
	justify-items: center;
`

export const AuthForm = () => (
	<Form onClick={(e) => e.preventDefault()}>
		<AuthStateBar />
		<Email />
		<Login />
		<Password />
		<RepeatPassword />
		<SubmitButton />
	</Form>
)
