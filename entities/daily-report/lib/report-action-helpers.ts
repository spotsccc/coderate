import { DailyReportT, Todo } from '@/shared/api/daily-report'
import { v4 } from 'uuid'

export const filterTodos = (report: DailyReportT, id: string) => ({
	...report,
	morningTodoList: report.morningTodoList.filter((todo) => todo.id !== id),
	dailyTodoList: report.dailyTodoList.filter((todo) => todo.id !== id),
})

export const toggleTodos = (report: DailyReportT, id: string) => ({
	...report,
	morningTodoList: report.morningTodoList.map((todo) =>
		todo.id === id ? { ...todo, done: !todo.done } : todo,
	),
	dailyTodoList: report.dailyTodoList.map((todo) =>
		todo.id === id ? { ...todo, done: !todo.done } : todo,
	),
})

export const createTodo = (content: string) => ({
	content,
	done: false,
	id: v4(),
})

export const appendMorningTodo = (report: DailyReportT, todo: Todo) => ({
	...report,
	morningTodoList: [...report.morningTodoList, todo],
})

export const appendDailyTodo = (report: DailyReportT, todo: Todo) => ({
	...report,
	dailyTodoList: [...report.dailyTodoList, todo],
})
