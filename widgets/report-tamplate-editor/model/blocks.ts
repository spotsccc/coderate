import { v4 } from 'uuid'
import { createEffect, createStore } from 'effector'

export enum BlockType {
	textBlock = 'textBlock',
	textBlockWithRating = 'textBlockWithRating',
	todolistBlock = 'todolistBlock',
}

export const BlockTitleMap: Record<BlockType, string> = {
	[BlockType.textBlock]: 'Text block',
	[BlockType.textBlockWithRating]: 'Text block with rating',
	[BlockType.todolistBlock]: 'Todolist Block',
}

export const BlockArray = [
	BlockType.textBlock,
	BlockType.textBlockWithRating,
	BlockType.todolistBlock,
]

export type BaseBlockConfig = {
	blockType: BlockType
	title: string
	id: string
}

export type TextBlockConfig = BaseBlockConfig
export type TextBlockWithRatingConfig = BaseBlockConfig & {
	ratings: Array<string>
}
export type TodolistBlockConfig = BaseBlockConfig

export type BlockConfig =
	| TextBlockConfig
	| TextBlockWithRatingConfig
	| TodolistBlockConfig

export const createTextBlockConfig = () => ({
	title: 'text block',
	id: v4(),
	blockType: BlockType.textBlock,
})

export const createTextBlockWithRatingConfig = () => ({
	title: 'text block with ratings',
	id: v4(),
	blockType: BlockType.textBlockWithRating,
	ratings: ['rating'],
})

export const createTodolistBlackConfig = () => ({
	title: 'todolist block',
	id: v4(),
	blockType: BlockType.todolistBlock,
})

export const createNewBlockFx = createEffect<
	{ draggedId: string },
	BlockConfig
>(({ draggedId }) => {
	switch (draggedId) {
		case BlockType.textBlock:
			return createTextBlockConfig()
		case BlockType.textBlockWithRating:
			return createTextBlockWithRatingConfig()
		case BlockType.todolistBlock:
			return createTodolistBlackConfig()
		default:
			return createTextBlockConfig()
	}
})

export const $blocks = createStore<Record<string, BlockConfig>>({})

$blocks.on(createNewBlockFx.doneData, (blocks, newBlock) => ({
	...blocks,
	[newBlock.id]: newBlock,
}))
