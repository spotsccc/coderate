import { createEvent, sample } from 'effector'
import { option } from 'fp-ts'
import { pipe } from 'fp-ts/function'

import { getUnsafeValue } from '@/shared/lib/fp-std/option'
import { DailyReport } from '@/entities/daily-report'

import { $editableReport, mapEditableReportToReport } from './editable-report'

export const changeMorningState = createEvent<string>()
export const changeEveningState = createEvent<string>()
export const changeEveningAnxiety = createEvent<number>()
export const changeEveningMood = createEvent<number>()
export const changeMorningAnxiety = createEvent<number>()
export const changeMorningMood = createEvent<number>()

sample({
	clock: changeMorningState,
	source: $editableReport,
	filter: option.isSome,
	fn: (editableReport, morningState) =>
		pipe(
			{
				...getUnsafeValue(editableReport),
				morningState,
			},
			mapEditableReportToReport,
		),
	target: DailyReport.update,
})

sample({
	clock: changeEveningState,
	source: $editableReport,
	filter: option.isSome,
	fn: (editableReport, eveningState) =>
		pipe(
			{
				...getUnsafeValue(editableReport),
				eveningState,
			},
			mapEditableReportToReport,
		),
	target: DailyReport.update,
})

sample({
	clock: changeEveningAnxiety,
	source: $editableReport,
	filter: option.isSome,
	fn: (editableReport, eveningAnxiety) =>
		pipe(
			{
				...getUnsafeValue(editableReport),
				eveningAnxiety,
			},
			mapEditableReportToReport,
		),
	target: DailyReport.update,
})

sample({
	clock: changeEveningMood,
	source: $editableReport,
	filter: option.isSome,
	fn: (editableReport, eveningMood) =>
		pipe(
			{
				...getUnsafeValue(editableReport),
				eveningMood,
			},
			mapEditableReportToReport,
		),
	target: DailyReport.update,
})

sample({
	clock: changeMorningMood,
	source: $editableReport,
	filter: option.isSome,
	fn: (editableReport, morningMood) =>
		pipe(
			{
				...getUnsafeValue(editableReport),
				morningMood,
			},
			mapEditableReportToReport,
		),
	target: DailyReport.update,
})

sample({
	clock: changeMorningAnxiety,
	source: $editableReport,
	filter: option.isSome,
	fn: (editableReport, morningAnxiety) =>
		pipe(
			{
				...getUnsafeValue(editableReport),
				morningAnxiety,
			},
			mapEditableReportToReport,
		),
	target: DailyReport.update,
})
