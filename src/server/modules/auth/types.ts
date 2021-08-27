import { signUp } from './sign-up';
import { RefreshToken } from "@server/modules/refresh-token"

export type LoginBody = Readonly<{
	login: string
	email: string
	password: string
}>

export type LoginResponse = Readonly<{
	accessToken: string
	refreshToken: string
}>

export type Tokens = Readonly<{
	refreshToken: RefreshToken
	accessToken: string
}>
