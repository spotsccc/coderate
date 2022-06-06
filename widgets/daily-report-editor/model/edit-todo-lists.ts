import { createEvent, sample } from 'effector'
import { option } from 'fp-ts'
import { pipe } from 'fp-ts/function'

import { getUnsafeValue } from '@/shared/lib/fp-std/option'
import { DailyReport } from '@/entities/daily-report'

import {
	$editableReport,
	$newDailyTodoText,
	$newMorningTodoText,
	mapEditableReportToReport,
} from './editable-report'

export const addDailyTodo = createEvent()
export const dailyTodoAdded = createEvent()
export const changeNewDailyTodoText = createEvent<string>()

export const addMorningTodo = createEvent()
export const morningTodoAdded = createEvent()
export const changeNewMorningTodoText = createEvent<string>()

export const toggleTodo = createEvent<string>()
export const deleteTodo = createEvent<string>()

$newDailyTodoText
	.on(changeNewDailyTodoText, (_, v) => v)
	.on(dailyTodoAdded, () => '')
$newMorningTodoText
	.on(changeNewMorningTodoText, (_, v) => v)
	.on(morningTodoAdded, () => '')

sample({
	clock: addDailyTodo,
	source: $editableReport,
	filter: option.isSome,
	fn: (editableReport) =>
		pipe(
			getUnsafeValue(editableReport),
			(report) => ({
				report: mapEditableReportToReport(report),
				text: report.newDailyTodoText,
			}),
			({ report, text }) =>
				DailyReport.appendDailyTodo(report, DailyReport.createTodo(text)),
		),
	target: [DailyReport.update, dailyTodoAdded],
})

sample({
	clock: addMorningTodo,
	source: $editableReport,
	filter: option.isSome,
	fn: (editableReport) =>
		pipe(
			getUnsafeValue(editableReport),
			(report) => ({
				report: mapEditableReportToReport(report),
				text: report.newMorningTodoText,
			}),
			({ report, text }) =>
				DailyReport.appendMorningTodo(report, DailyReport.createTodo(text)),
		),
	target: [DailyReport.update, morningTodoAdded],
})

sample({
	clock: toggleTodo,
	source: $editableReport,
	filter: option.isSome,
	fn: (report, id) =>
		pipe(getUnsafeValue(report), mapEditableReportToReport, (report) =>
			DailyReport.toggleTodos(report, id),
		),
	target: DailyReport.update,
})

sample({
	clock: deleteTodo,
	source: $editableReport,
	filter: option.isSome,
	fn: (report, id) =>
		pipe(getUnsafeValue(report), mapEditableReportToReport, (report) =>
			DailyReport.filterTodos(report, id),
		),
	target: DailyReport.update,
})
