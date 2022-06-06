import { styled } from '@mui/material/styles'

import { DailyReportEditor } from '@/widgets/daily-report-editor'

const FlexContainer = styled('div')`
	display: flex;
`

export const View = () => (
	<FlexContainer>
		<DailyReportEditor.View />
	</FlexContainer>
)
