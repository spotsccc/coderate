import { useEvent, useStore } from 'effector-react'
import { ChangeEvent, FormEvent } from 'react'
import {
	Box,
	Button,
	CircularProgress,
	Container,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material'

import {
	$authFlow,
	$email,
	$loading,
	$login,
	$loginOrEmail,
	$password,
	changeAuthFlow,
	changeEmail,
	changeLogin,
	changeLoginOrEmail,
	changePassword,
	AuthFlow,
	submit,
} from './model'

export const View = () => {
	const password = useStore($password)
	const email = useStore($email)
	const login = useStore($login)
	const loginOrEmail = useStore($loginOrEmail)
	const buttonText = useStore(
		$authFlow.map((flow) => (flow === AuthFlow.login ? 'login' : 'sign up')),
	)
	const changeLoginOrEmailB = useEvent(
		changeLoginOrEmail.prepend(
			(e: ChangeEvent<HTMLInputElement>) => e.target.value,
		),
	)
	const changePasswordB = useEvent(
		changePassword.prepend(
			(e: ChangeEvent<HTMLInputElement>) => e.target.value,
		),
	)
	const changeLoginB = useEvent(
		changeLogin.prepend((e: ChangeEvent<HTMLInputElement>) => e.target.value),
	)
	const changeEmailB = useEvent(
		changeEmail.prepend((e: ChangeEvent<HTMLInputElement>) => e.target.value),
	)
	const authFlow = useStore($authFlow)
	const submitB = useEvent(submit)
	const changeAuthFlowB = useEvent(changeAuthFlow)
	const loading = useStore($loading)
	return (
		<Box
			sx={{
				display: 'flex',
				width: '100vw',
				height: '100vh',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Container
				maxWidth="xs"
				component="form"
				onSubmit={(e: FormEvent) => {
					e.preventDefault()
					submitB()
				}}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '8px',
				}}
			>
				<Typography variant="h6" textAlign="center">
					Authorization
				</Typography>
				<ToggleButtonGroup
					sx={{ width: 'max-content', margin: '0 auto' }}
					value={authFlow}
					exclusive
					onChange={(_, flow) => changeAuthFlowB(flow)}
				>
					<ToggleButton value={AuthFlow.login}>Login</ToggleButton>
					<ToggleButton value={AuthFlow.signUp}>Sign up</ToggleButton>
				</ToggleButtonGroup>
				{authFlow === AuthFlow.signUp ? (
					<>
						<TextField
							value={login}
							onChange={changeLoginB}
							placeholder="login"
						/>
						<TextField
							value={email}
							onChange={changeEmailB}
							placeholder="email"
						/>
						<TextField
							value={password}
							onChange={changePasswordB}
							type="password"
							placeholder="password"
						/>
					</>
				) : (
					<>
						<TextField
							value={loginOrEmail}
							onChange={changeLoginOrEmailB}
							placeholder="login or email"
						/>
						<TextField
							value={password}
							onChange={changePasswordB}
							type="password"
							placeholder="password"
						/>
					</>
				)}
				{loading ? (
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<CircularProgress />
					</Box>
				) : (
					<Button type="submit">{buttonText}</Button>
				)}
			</Container>
		</Box>
	)
}
