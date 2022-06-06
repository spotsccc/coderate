import { createEffect } from 'effector'

import { authRequest, baseRequest } from '../base-request'

export type DailyReportT = {
	morningState: string
	eveningState: string
	morningMood: number
	eveningMood: number
	morningAnxiety: number
	eveningAnxiety: number
	morningTodoList: TodoList
	dailyTodoList: TodoList
	dreamRecord: string
	date: string
	authorId: string
	_id: string
}

export type DailyReportDraft = Omit<DailyReportT, '_id' | 'authorId'>

export type TodoList = Array<Todo>

export type Todo = {
	content: string
	done: boolean
	id: string
}

export const getAllReportsFx = createEffect<void, Array<DailyReportT>>(
	async () => {
		const response = await authRequest({ url: '/api/daily-reports' })
		return response
	},
)

export const createReport = createEffect<
	{ draft: DailyReportDraft },
	DailyReportT
>(async ({ draft }) => {
	const response = await authRequest({
		url: '/api/daily-reports',
		cfg: { body: JSON.stringify({ draft }), method: 'POST' },
	})
	return response
})

const delay = () =>
	new Promise((resolve) => {
		setTimeout(() => resolve(1), 3000)
	})

export const updateReportFx = createEffect<
	{ report: DailyReportT; signal?: AbortSignal },
	DailyReportT
>(async ({ report, signal }) => {
	const response = await authRequest({
		url: '/api/daily-reports',
		cfg: { body: JSON.stringify({ report }), signal, method: 'PATCH' },
	})
	return response
})
