import { guard, Event, Store } from 'effector'

export const splitFt = <Source extends unknown>({
	source,
	cases,
	match,
}: {
	source: Event<Source>
	cases: Record<string, Event<any>>
	match: Record<string, Store<boolean>>
}) =>
	Object.entries(match).forEach(([name, store]) =>
		guard({
			source: source,
			filter: store,
			target: cases[name],
		}),
	)
