import { createEffect, createEvent, restore, sample } from 'effector'
import { option as O } from 'fp-ts'
import { History } from 'history'

import Option = O.Option
import { void_ } from '@client/shared/lib/fp'

export type Config = {
	url: string
}

type ConfigWithHistory = {
	history: Option<History>
} & Config

export const setHistory = createEvent<History>()
export const redirect = createEvent<Config>()

const $history = restore(setHistory.map(O.some), O.none)

const redirectFx = createEffect<ConfigWithHistory, void>()

const zipParams = (
	history: Option<History>,
	config: Config,
): ConfigWithHistory => ({
	...config,
	history,
})

sample({
	clock: redirect,
	source: $history,
	fn: zipParams,
	target: redirectFx,
})

redirectFx.use(({ history, url }) =>
	O.match(void_, (h: History) => h.push(url))(history),
)
