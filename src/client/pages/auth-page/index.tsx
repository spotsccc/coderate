import React, { FC } from 'react'
import { AuthForm } from '@client/widgets/auth-form'
import { useGate } from 'effector-react'
import { useHistory } from 'react-router-dom'
import { gate } from './model'

export const AuthPage: FC = () => {
	const history = useHistory()
	useGate(gate, history)
	return <AuthForm />
}
