import React, { FC } from 'react'
import styled from 'styled-components'
import { Event } from 'effector'

import { WeekdayList } from './weekday-list'
import { MonthName, YearNumber } from '../../model'

export type Props = {
	monthName: MonthName
	yearNumber: YearNumber
	selectNextMonth: Event<unknown>
	selectPrevMonth: Event<unknown>
}

export const CurrentMonthName = styled.p`
	font-size: 24px;
	margin: 0;
`

const HeaderContainer = styled.header`
	display: flex;
	width: 100%;
	padding: 0 20px;
	background: white;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
	height: 80px;
`

export const Header: FC<Props> = ({
	monthName,
	yearNumber,
	selectNextMonth,
	selectPrevMonth,
}) => (
	<HeaderContainer>
		<div>
			<button onClick={selectPrevMonth}>-</button>
			<CurrentMonthName>{monthName}</CurrentMonthName>
			<CurrentMonthName>{yearNumber}</CurrentMonthName>
			<button onClick={selectNextMonth}>+</button>
		</div>
		<WeekdayList />
	</HeaderContainer>
)
