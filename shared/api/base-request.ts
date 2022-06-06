import { createEffect, createEvent, restore, attach, sample } from 'effector'
import { GetServerSidePropsContext } from 'next'
import { option } from 'fp-ts'
import { Navigation } from '@/shared/lib/navigation'

export const setContext =
	createEvent<option.Option<GetServerSidePropsContext>>()

export const $nextContext = restore(setContext, option.none)

export const baseRequest = createEffect(
	({
		url,
		cfg,
		context,
	}: {
		url: string
		cfg?: RequestInit
		context: option.Option<GetServerSidePropsContext>
	}) =>
		fetch(`http://localhost:3000${url}`, {
			...cfg,
			headers: {
				...cfg?.headers,
				'Content-Type': 'application/json;charset=utf-8',
				credentials: 'same-origin',
				Cookie: option.match<GetServerSidePropsContext, string>(
					() => '',
					(ctx) => ctx.req.headers.cookie ?? '',
				)(context),
			},
		}).then((response) => {
			if (option.isSome(context)) {
				context.value.res.setHeader(
					'Set-Cookie',
					response.headers.get('Set-Cookie') ?? '',
				)
			}
			if (response.status !== 200) {
				throw new Error(response.statusText)
			}
			return response.json()
		}),
)

export const authRequest = attach({
	effect: baseRequest,
	source: $nextContext,
	mapParams: (params: { url: string; cfg?: RequestInit }, context) => ({
		...params,
		context,
	}),
})

sample({
	clock: authRequest.failData,
	target: Navigation.pushFx.prepend(() => '/auth'),
})
