import { attach, createStore } from 'effector'
import { API } from '@/shared/api'
import { DailyReportT } from '@/shared/api/daily-report'

const $abortController = createStore(new AbortController())

export const cancelFx = attach({
	source: $abortController,
	effect: async ({ abort }) => abort(),
})

export const updateReportFx = attach({
	effect: API.DailyReport.updateReportFx,
	source: $abortController,
	mapParams: (params: { report: DailyReportT }, abortController) => ({
		...params,
		signal: abortController.signal,
	}),
})
