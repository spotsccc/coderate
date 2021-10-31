import { createEffect, createEvent, guard, sample, Store } from 'effector'
import { option as O } from 'fp-ts'
import axios from 'axios'

import { ApiConfig, Methods } from './api-config'

import Option = O.Option

export const createApiCall =
	(apiConfig: Store<Option<ApiConfig>>) =>
	<RequestBody = unknown, Response = unknown, Failed = unknown>(
		path: string,
		method: Methods,
	) => {
		type CallParams = {
			config: ApiConfig
			body: RequestBody
		}
		type CallPayload = {
			body: RequestBody
			params?: Record<string, string>
		}
		const call = createEvent<CallPayload>()
		const callFx = createEffect<CallParams, Response, Failed>(
			({ config, body }) => {
				switch (method) {
					case Methods.GET:
						return axios.get(path, config)
					case Methods.POST:
						return axios.post(path, body, config)
					case Methods.DELETE:
						return axios.delete(path, config)
					case Methods.PUT:
						return axios.put(path, body, config)
				}
			},
		)
		const guardedConfig = guard({
			clock: call,
			source: apiConfig,
			filter: O.isSome,
		})
		sample({
			clock: guardedConfig,
			source: call,
			fn: (payload, guardedConfig) => ({
				body: payload.body,
				config: { ...guardedConfig.value, params: payload.params },
			}),
			target: callFx,
		})
		return {
			call,
			callFx,
		}
	}
