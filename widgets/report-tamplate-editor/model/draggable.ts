import {
	createEvent,
	createStore,
	sample,
	createEffect,
	scopeBind,
} from 'effector'
import { option } from 'fp-ts'
import { MutableRefObject } from 'react'

import { getUnsafeValue } from '@/shared/lib/fp-std/option'

export type Coordinates = {
	x: number
	y: number
}

export type Rectangle = {
	topLeft: Coordinates
	topRight: Coordinates
	bottomLeft: Coordinates
	bottomRight: Coordinates
}

export const dragStarted = createEvent<string>()
export const mouseMove = createEvent<Coordinates>()
export const drop = createEvent()
export const dropFinished = createEvent()
export const appendToRefs =
	createEvent<Record<string, MutableRefObject<HTMLDivElement>>>()
export const removeFromHrefs = createEvent<string>()

export const $draggedBlockId = createStore<option.Option<string>>(option.none)
export const $draggedRef = createStore<
	option.Option<MutableRefObject<HTMLDivElement>>
>(option.none)
export const $blockRefs = createStore<
	Record<string, MutableRefObject<HTMLDivElement>>
>({})
export const $mouseCoordinates = createStore<option.Option<Coordinates>>(
	option.none,
)

const updatedDraggedPositionFx = createEffect(
	({
		ref,
		mouseCoordinates,
	}: {
		ref: MutableRefObject<HTMLDivElement>
		mouseCoordinates: Coordinates
	}) => {
		ref.current.style.position = 'absolute'
		ref.current.style.left =
			mouseCoordinates.x - ref.current.offsetWidth / 2 + 'px'
		ref.current.style.top =
			mouseCoordinates.y - ref.current.offsetHeight / 2 + 'px'
	},
)

const unsetAbsolutePositionToDraggedFx = createEffect(
	(ref: MutableRefObject<HTMLDivElement>) => {
		ref.current.style.position = 'unset'
		ref.current.style.left = 0 + 'px'
		ref.current.style.top = 0 + 'px'
	},
)

export const addListenerFx = createEffect(() => {
	const scopedMouseMove = scopeBind(mouseMove)
	document.addEventListener('pointermove', (e) =>
		scopedMouseMove({ x: e.pageX, y: e.pageY }),
	)
})

export const removeListenerFx = createEffect(() => {
	const scopedMouseMove = scopeBind(mouseMove)
	document.removeEventListener('pointermove', (e) =>
		scopedMouseMove({ x: e.pageX, y: e.pageY }),
	)
})

$blockRefs.on(appendToRefs, Object.assign)
$draggedRef.reset(dropFinished)
$mouseCoordinates.on(mouseMove, (_, v) => option.some(v))
$draggedBlockId.on(dragStarted, (_, v) => option.some(v)).reset(dropFinished)

sample({
	clock: dragStarted,
	source: $blockRefs,
	fn: (blockRefs, draggedId) => option.some(blockRefs[draggedId]),
	target: $draggedRef,
})

sample({
	clock: dragStarted,
	source: $blockRefs,
	fn: (refs, draggedId) =>
		Object.fromEntries(
			Object.entries(refs).filter(([id]) => id !== draggedId),
		),
	target: $blockRefs,
})

sample({
	clock: drop,
	source: $draggedRef,
	filter: (draggedRef) => option.isSome(draggedRef),
	fn: (draggedRef) => getUnsafeValue(draggedRef),
	target: unsetAbsolutePositionToDraggedFx,
})

sample({
	clock: drop,
	source: {
		draggedRef: $draggedRef,
		draggedId: $draggedBlockId,
		blockRefs: $blockRefs,
	},
	filter: ({ draggedRef, draggedId }) =>
		option.isSome(draggedRef) && option.isSome(draggedId),
	fn: ({ draggedRef, draggedId, blockRefs }) => ({
		...blockRefs,
		[getUnsafeValue(draggedId)]: getUnsafeValue(draggedRef),
	}),
	target: $blockRefs,
})

sample({
	clock: mouseMove,
	source: {
		coordinates: $mouseCoordinates,
		draggedRef: $draggedRef,
	},
	filter: ({ coordinates, draggedRef }) =>
		option.isSome(coordinates) && option.isSome(draggedRef),
	fn: ({ coordinates, draggedRef }) => ({
		ref: getUnsafeValue(draggedRef),
		mouseCoordinates: getUnsafeValue(coordinates),
	}),
	target: updatedDraggedPositionFx,
})
