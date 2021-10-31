import { createSafeApiCall, Methods } from '@/shared/lib/api/model'

export const { call: fetchUserByLogin, callFx: fetchUserByLoginFx } =
	createSafeApiCall('/user', Methods.GET)
