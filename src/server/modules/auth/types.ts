export type LoginBody = Readonly<{
	login: string
}>

export type LoginResponse = Readonly<{
	accessToken: string
	refreshToken: string
}>
