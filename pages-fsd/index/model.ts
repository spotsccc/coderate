import { attach, createEvent, sample } from 'effector'
import { isSameDay, parseISO } from 'date-fns'

import { API } from '@/shared/api'
import { DailyReport } from '@/entities/daily-report'
import { CreateDailyReport } from '@/features/create-daily-report'
import { DailyReportEditor } from '@/widgets/daily-report-editor'

export const pageLoadStarted = createEvent()
export const pageLoaded = createEvent()

const getAllReportsFx = attach({ effect: API.DailyReport.getAllReportsFx })

sample({
	clock: pageLoadStarted,
	target: getAllReportsFx,
})

sample({
	clock: getAllReportsFx.doneData,
	target: DailyReport.appendAll,
})

sample({
	clock: getAllReportsFx.doneData,
	source: DailyReport.$entities,
	filter: (reports) =>
		!Object.values(reports).some((report) =>
			isSameDay(new Date(), parseISO(report.date)),
		),
	target: CreateDailyReport.createDailyReportFx,
})

sample({
	clock: pageLoaded,
	target: DailyReportEditor.init,
})
