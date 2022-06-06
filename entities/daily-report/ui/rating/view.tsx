import { Box, Rating } from '@mui/material'
import { FC } from 'react'

export type DailyRatingProps = {
	value: number
	changeValue: (v: number) => void
	title: string
}

export const DailyRating: FC<DailyRatingProps> = ({
	value,
	changeValue,
	title,
}) => (
	<Box sx={{ display: 'flex', alignItems: 'center' }}>
		{title}
		<Rating value={value} onChange={(_, value) => changeValue(value ?? 0)} />
	</Box>
)
