import { ChangeEventHandler, FC } from 'react'
import { Card } from '@/shared/ui/card/view'
import { TextField } from '@mui/material'

export type DreamRecordProps = {
	text: string
	changeText: ChangeEventHandler<HTMLTextAreaElement>
}

export const DreamRecord: FC<DreamRecordProps> = ({ text, changeText }) => (
	<Card title="Dream record">
		<TextField
			value={text}
			onChange={changeText}
			multiline
			sx={{ width: 360 }}
			minRows={10}
			maxRows={10}
		/>
	</Card>
)
