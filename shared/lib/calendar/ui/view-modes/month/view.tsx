import React, { FC } from 'react'
import styled from 'styled-components'

import { indents } from '@/shared/ui/constants'

import { createKeyForDay, DayKey, Day as DayModel } from '../../../model'
import { Day } from './day'

export type Props = {
	days: DayModel[]
}

const MonthContainer = styled.div`
	padding: ${indents[4]};
	height: 736px;
	box-sizing: border-box;
	display: grid;
	max-height: calc(100vh - 80px);
	overflow: auto;
	grid-gap: ${indents[4]};
	grid-template-columns: repeat(7, 1fr);
`

export const MonthView: FC<Props> = ({ days }) => {
	return (
		<MonthContainer>
			{days.map((day) => (
				<Day day={day} key={createKeyForDay(day)} />
			))}
		</MonthContainer>
	)
}
