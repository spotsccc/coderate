import { Store } from 'effector'
import { option as O } from 'fp-ts'

import { redirect } from '@client/shared/lib/history'

import { ApiConfig, Methods } from './api-config'
import { createApiCall } from './create-api-call'

import Option = O.Option

export const createSafeCallFactory =
	(config: Store<Option<ApiConfig>>) => (path: string, method: Methods) => {
		const { call, callFx } = createApiCall(config)(path, method)
		callFx.failData.watch((err: any) => {
			switch (err.response.status) {
				case 401:
					redirect({ url: '/unauthorized' })
					break
				case 403:
					redirect({ url: '/access-denied' })
					break
				default:
					redirect({ url: '/unhandled-request-error' })
			}
		})
		return { call, callFx }
	}
