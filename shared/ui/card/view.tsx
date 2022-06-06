import { Paper, Typography } from '@mui/material'
import { FC } from 'react'

export type CardProps = {
	title: string
}

export const Card: FC<CardProps> = ({ title, children }) => (
	<Paper
		elevation={3}
		sx={{ padding: '8px', width: 360, height: 'max-content' }}
	>
		<Typography variant="h6">{title}</Typography>
		{children}
	</Paper>
)
