import styled from 'styled-components'
import React, { FC } from 'react'

import { Counter } from '@client/shared/ui/coutner'
import { colors, indents } from '@client/shared/ui/constants'

import { Day as DayModel } from '../../../model'

export type Props = {
	day: DayModel
}

export const DayNumberView = styled.p`
	margin: 0;
	position: absolute;
	right: 4px;
	bottom: 4px;
	font-size: 80px;
`

type DatePlateProps = {
	isWeekend: boolean
}

export const DayPlateView = styled.div<DatePlateProps>`
	background: ${({ isWeekend }) => (isWeekend ? colors.red : colors.grey)};
	border-radius: ${indents[1]};
	position: relative;
`

export const Day: FC<Props> = ({ day }) => (
	<DayPlateView isWeekend={day.isWeekend}>
		<Counter count={day.noteIds.length} />
		<DayNumberView>{day.number}</DayNumberView>
	</DayPlateView>
)
