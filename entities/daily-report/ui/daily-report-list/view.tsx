import { useStore } from 'effector-react'
import { FC } from 'react'
import { format } from 'date-fns'

import { DailyReport } from '@/entities/daily-report'
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material'

type DailyReportListViewProps = {
	id: string
	selectEditableDailyReport: (id: string) => void
	selected: boolean
}

const DailyReportListItemView: FC<DailyReportListViewProps> = ({
	id,
	selectEditableDailyReport,
	selected,
}) => {
	const report = useStore(
		DailyReport.$entities.map((entities) => entities[id]),
	)
	const date = format(new Date(report.date), 'dd-MM-yyyy')
	return (
		<ListItemButton
			onClick={() => selectEditableDailyReport(id)}
			selected={selected}
		>
			<ListItemText>{date}</ListItemText>
		</ListItemButton>
	)
}

type DailyReportListProps = {
	selectEditableDailyReport: (id: string) => void
	selectedId: string
}

export const DailyReportList: FC<DailyReportListProps> = ({
	selectEditableDailyReport,
	selectedId,
}) => {
	const ids = useStore(DailyReport.$ids)
	return (
		<List sx={{ width: '160px' }}>
			{ids.map((id) => (
				<DailyReportListItemView
					id={id}
					key={id}
					selected={id === selectedId}
					selectEditableDailyReport={selectEditableDailyReport}
				/>
			))}
		</List>
	)
}
