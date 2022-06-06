import { sample } from 'effector'
import { debounce } from 'patronum'

import { UpdateReport } from '@/features/update-report'
import { DailyReport } from '@/entities/daily-report'

import { changeEveningState, changeMorningState } from './edit-states'

const saveTimeout = 300

const cancelTriggers = [changeMorningState, changeEveningState]

sample({
	clock: debounce({ source: DailyReport.update, timeout: saveTimeout }),
	fn: (report) => ({
		report,
	}),
	target: UpdateReport.updateReportFx,
})

sample({
	clock: cancelTriggers,
	target: UpdateReport.cancelFx,
})
