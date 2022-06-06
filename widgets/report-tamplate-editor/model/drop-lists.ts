import { createEvent, createStore, sample, split } from 'effector'
import { MutableRefObject } from 'react'
import { option } from 'fp-ts'

import { getUnsafeValue } from '@/shared/lib/fp-std/option'

import { BlockArray, BlockType, createNewBlockFx } from './blocks'
import {
	$blockRefs,
	$draggedBlockId,
	$mouseCoordinates,
	Coordinates,
	drop,
	dropFinished,
	mouseMove,
	Rectangle,
} from './draggable'

enum DropType {
	createNewBlock = 'createNewBlock',
	moveExistingBlock = 'moveExistingBlock',
	nothing = 'nothing',
}

export const appendToList =
	createEvent<{ listToAppendId: string; blockId: string }>()
export const appendToLists =
	createEvent<{ id: string; ref: MutableRefObject<HTMLDivElement> }>()
export const removeFromLists = createEvent<string>()
export const checkDropTarget = createEvent<{
	listToAppendId: option.Option<string>
	draggedId: string
}>()
export const tryInsertPlaceholder = createEvent<option.Option<string>>()

export const $listIds = createStore<Array<string>>([])
export const $listRefs = createStore<
	Record<number, MutableRefObject<HTMLDivElement>>
>({})
export const $blockIdsByListId = createStore<Record<string, Array<string>>>({})

$listRefs
	.on(appendToLists, (refs, { id, ref }) => ({
		...refs,
		[id]: ref,
	}))
	.on(removeFromLists, (refs, id) =>
		Object.fromEntries(
			Object.entries(refs).filter(([key]) => key !== '' + id),
		),
	)

$listIds
	.on(appendToLists, (listIds, { id }) => [...listIds, id])
	.on(removeFromLists, (listIds, id) =>
		listIds.filter((listId) => listId !== id),
	)

$blockIdsByListId
	.on(appendToLists, (blockIdsByListId, { id }) => ({
		...blockIdsByListId,
		[id]: [],
	}))
	.on(removeFromLists, (blockIdsByListId, id) =>
		Object.fromEntries(
			Object.entries(blockIdsByListId).filter(([key]) => key !== id),
		),
	)
	.on(appendToList, (blockIdsByListId, { blockId, listToAppendId }) => ({
		...blockIdsByListId,
		[listToAppendId]: [...blockIdsByListId[listToAppendId], blockId],
	}))

// check dragged target and choose drop flow
split({
	source: checkDropTarget,
	match: ({ draggedId, listToAppendId }) => {
		if (option.isNone(listToAppendId)) {
			return DropType.nothing
		}
		if (BlockArray.includes(draggedId as BlockType)) {
			return DropType.createNewBlock
		}
		return DropType.moveExistingBlock
	},
	cases: {
		[DropType.createNewBlock]: createNewBlockFx,
	},
})

// find list id that is drop target
sample({
	clock: drop,
	source: {
		coordinates: $mouseCoordinates,
		listRefs: $listRefs,
		draggedId: $draggedBlockId,
	},
	filter: ({ draggedId, coordinates }) =>
		option.isSome(draggedId) && option.isSome(coordinates),
	fn: ({ coordinates, listRefs, draggedId }) => {
		const listToAppend = Object.entries(listRefs).find(([_, ref]) =>
			isInside(calcRectangle(ref.current), getUnsafeValue(coordinates)),
		)
		return {
			draggedId: getUnsafeValue(draggedId),
			listToAppendId: option.fromNullable((listToAppend ?? [])[0]),
		}
	},
	target: [dropFinished, checkDropTarget],
})

// append created block to list that has been hovered when drop
sample({
	clock: createNewBlockFx.doneData,
	source: checkDropTarget,
	fn: ({ listToAppendId }, newBlock) => ({
		listToAppendId: getUnsafeValue(listToAppendId),
		blockId: newBlock.id,
	}),
	target: appendToList,
})

sample({
	clock: mouseMove,
	source: {
		blockRefs: $blockRefs,
		draggedId: $draggedBlockId,
	},
	filter: ({ draggedId }) => option.isSome(draggedId),
	fn: ({ blockRefs, draggedId }, coordinates) => {
		const hoveredEntry = Object.entries(blockRefs).find(([_, blockRef]) =>
			isInside(calcRectangle(blockRef.current), coordinates),
		)
		return hoveredEntry === undefined
			? option.none
			: option.some(hoveredEntry[0])
	},
	target: tryInsertPlaceholder,
})

sample({
	clock: tryInsertPlaceholder,
})

const calcRectangle = (div: HTMLDivElement): Rectangle => {
	const topLeft = { y: div.offsetTop, x: div.offsetLeft }
	const topRight = { y: topLeft.y, x: topLeft.x + div.clientWidth }
	const bottomLeft = { y: topLeft.y + div.clientHeight, x: topLeft.x }
	const bottomRight = { y: bottomLeft.y, x: topRight.x }
	return {
		topLeft,
		bottomLeft,
		bottomRight,
		topRight,
	}
}

const isInside = (rect: Rectangle, coordinates: Coordinates) =>
	rect.topLeft.y < coordinates.y &&
	rect.bottomLeft.y > coordinates.y &&
	rect.topLeft.x < coordinates.x &&
	rect.topRight.x > coordinates.x
