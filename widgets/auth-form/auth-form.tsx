import React from 'react'
import styled from 'styled-components'

import { preventDefault } from '@/shared/lib/fp'

import { bindedViews } from './binded-views'

const { AuthStateBar, Email, Login, Password, RepeatPassword, SubmitButton } =
	bindedViews

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
	<Form onClick={preventDefault}>
		<AuthStateBar />
		<Email />
		<Login />
		<Password />
		<RepeatPassword />
		<SubmitButton />
	</Form>
)