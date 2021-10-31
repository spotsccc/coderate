import { option as O } from 'fp-ts'
import { createEvent, restore } from 'effector'

export enum Methods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export type ApiConfig = {
	baseURL: string
	withCredentials: boolean
	params?: Record<string, string>
}

export const setApiConfig = createEvent<ApiConfig>()
export const $apiConfig = restore(setApiConfig.map(O.some), O.none)
