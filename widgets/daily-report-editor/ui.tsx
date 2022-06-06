import { styled } from '@mui/material/styles'
import { option } from 'fp-ts'
import { identity } from 'fp-ts/function'
import { Box, Typography } from '@mui/material'
import { reflect } from '@effector/reflect/ssr'

import { DailyReport } from '@/entities/daily-report'

import {
	$editableReport,
	$editableReportId,
	setEditableReportId,
} from './model'
import {
	DailyTodoList,
	DreamRecord,
	EveningState,
	MorningState,
	MorningTodoList,
} from './bindings'
import { useStore } from 'effector-react'
import { format } from 'date-fns'

const ReportList = reflect({
	view: DailyReport.DailyReportList,
	bind: {
		selectedId: $editableReportId.map(option.match(() => '', identity)),
		selectEditableDailyReport: setEditableReportId.prepend(option.some),
	},
})

export const View = () => (
	<>
		<ReportList />
		<ReportEditorLayout />
	</>
)

const ReportEditorLayout = () => {
	const currentDate = useStore(
		$editableReport.map(
			option.match(
				() => '',
				(report) => format(new Date(report.date), 'dd-MM-yyyy'),
			),
		),
	)
	return (
		<ReportEditorContainer>
			<Typography variant="h6">{currentDate}</Typography>
			<Box sx={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
				<MorningState />
				<EveningState />
			</Box>
			<Box sx={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
				<MorningTodoList />
				<DailyTodoList />
			</Box>
			<Box sx={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
				<DreamRecord />
			</Box>
		</ReportEditorContainer>
	)
}

const ReportEditorContainer = styled('div')`
	width: 100%;
	min-height: 100%;
`
