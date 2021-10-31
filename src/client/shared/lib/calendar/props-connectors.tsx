import React, { FC } from 'react'
import { option as O } from 'fp-ts'

import { getSomeValue } from '@client/shared/lib/fp/get-value'

import { MonthName, Day, YearNumber } from './model'
import { Props as HeaderProps } from './ui/header'
import { Props as CalendarTapeProps } from './ui/view-modes/month'

export type UnwrappedCalendarTapeProps = {
	days: O.Option<Day[]>
} & Omit<CalendarTapeProps, 'days'>

export type UnwrappedHeaderProps = {
	yearNumber: O.Option<YearNumber>
	monthName: O.Option<MonthName>
} & Omit<HeaderProps, 'yearNumber' | 'monthName'>

export const headerPropsConnector =
	(Header: FC<HeaderProps>) =>
	({ monthName, yearNumber, ...props }: UnwrappedHeaderProps) =>
		(
			<Header
				monthName={getSomeValue(monthName as O.Some<MonthName>)}
				yearNumber={getSomeValue(yearNumber as O.Some<YearNumber>)}
				{...props}
			/>
		)

export const monthViewPropsConnector =
	(MonthView: FC<CalendarTapeProps>) =>
	({ days, ...props }: UnwrappedCalendarTapeProps) =>
		<MonthView days={(days as O.Some<Day[]>).value} {...props} />
