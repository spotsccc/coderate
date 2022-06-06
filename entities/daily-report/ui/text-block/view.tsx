import { styled } from '@mui/material/styles'
import { ChangeEventHandler, FC } from 'react'
import { Grid, TextField } from '@mui/material'
import { Card } from '@/shared/ui/card/view'
import { DailyRating } from '@/entities/daily-report/ui/rating'

export type TextBlockProps = {
	onChange: ChangeEventHandler<HTMLTextAreaElement>
	value: string
	title: string
	anxiety: number
	mood: number
	setAnxiety: (v: number) => void
	setMood: (v: number) => void
}

export const TextBlock: FC<TextBlockProps> = ({
	onChange,
	value,
	title,
	anxiety,
	setAnxiety,
	mood,
	setMood,
}) => (
	<Card title={title}>
		<TextField
			onChange={onChange}
			value={value}
			key={title}
			multiline
			sx={{ width: 360 }}
			minRows={10}
			maxRows={10}
		/>
		<DailyRating value={mood} changeValue={setMood} title={'mood'} />
		<DailyRating value={anxiety} changeValue={setAnxiety} title={'anxiety'} />
	</Card>
)

export const TextArea = styled('textarea')`
	resize: none;
	width: 400px;
	height: 400px;
	padding: 0;
	box-sizing: border-box;
`

const Title = styled('div')`
	font-size: 20px;
`
