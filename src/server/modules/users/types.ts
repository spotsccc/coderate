export type User = Readonly<{
	password: string
	login: string
	email: string
	id: string
}>

export type CreateUserDTO = Readonly<{
	password: string
	login: string
	email: string
}>
