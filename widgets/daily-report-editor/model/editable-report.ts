import { combine, createEvent, createStore, restore, sample } from 'effector'
import { option } from 'fp-ts'
import { DailyReport } from '@/entities/daily-report'
import { DailyReportT } from '@/shared/api/daily-report'
import { last } from 'fp-ts/Array'
import { omit } from '@/shared/lib/ts'

export type EditableReport = {
	newMorningTodoText: string
	newDailyTodoText: string
} & DailyReportT

export const mapEditableReportToReport = (
	editableReport: EditableReport,
): DailyReportT =>
	omit(editableReport, 'newMorningTodoText', 'newDailyTodoText')

export const init = createEvent()
export const setEditableReportId = createEvent<option.Option<string>>()

export const $editableReportId = restore(setEditableReportId, option.none)
export const $newMorningTodoText = createStore('')
export const $newDailyTodoText = createStore('')

export const $editableReport = combine(
	{
		id: $editableReportId,
		newDailyTodoText: $newDailyTodoText,
		newMorningTodoText: $newMorningTodoText,
		reports: DailyReport.$entities,
	},
	({ id, newDailyTodoText, newMorningTodoText, reports }) =>
		option.map<string, EditableReport>((id) => ({
			...reports[id],
			newDailyTodoText,
			newMorningTodoText,
		}))(id),
)

sample({
	clock: init,
	source: DailyReport.$ids,
	fn: (reportIds) => last(reportIds),
	target: setEditableReportId,
})
