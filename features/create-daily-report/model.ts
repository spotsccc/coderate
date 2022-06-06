import { attach, createStore, sample } from 'effector'

import { API } from '@/shared/api/'
import { DailyReportDraft } from '@/shared/api/daily-report/model'
import { DailyReport } from '@/entities/daily-report'

const $emptyDraft = createStore<DailyReportDraft>({
	dailyTodoList: [],
	date: new Date().toISOString(),
	morningTodoList: [],
	eveningState: '',
	morningState: '',
	morningMood: 0,
	morningAnxiety: 0,
	eveningAnxiety: 0,
	eveningMood: 0,
	dreamRecord: '',
})

export const createDailyReportFx = attach({
	effect: API.DailyReport.createReport,
	source: $emptyDraft.map((draft) => ({
		draft: { ...draft, date: new Date().toISOString() },
	})),
})

sample({
	clock: createDailyReportFx.doneData,
	target: DailyReport.append,
})
