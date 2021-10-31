import { loginFx } from '@client/shared/lib/api'
import { createGate } from 'effector-react'
import { History } from 'history'
import { createEffect, guard } from 'effector'

export const gate = createGate<History>('auth-gate')

const redirectFx = (url: string) =>
	createEffect((history: History) => history.push(url))

guard({
	clock: loginFx.done,
	source: gate.state,
	filter: Boolean,
	target: redirectFx('/'),
})
