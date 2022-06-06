import { createEvent, sample } from 'effector'
import {
	$editableReport,
	mapEditableReportToReport,
} from '@/widgets/daily-report-editor/model/editable-report'
import { option } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import { getUnsafeValue } from '@/shared/lib/fp-std/option'
import { DailyReport } from '@/entities/daily-report'

export const changeDreamRecord = createEvent<string>()

sample({
	clock: changeDreamRecord,
	source: $editableReport,
	filter: option.isSome,
	fn: (report, dreamRecord) =>
		pipe(
			report,
			getUnsafeValue,
			(report) => ({
				...report,
				dreamRecord,
			}),
			mapEditableReportToReport,
		),
	target: DailyReport.update,
})
