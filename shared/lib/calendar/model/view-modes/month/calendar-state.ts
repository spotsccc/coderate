import { createEffect, createEvent, createStore, forward } from 'effector'
import { option as O } from 'fp-ts'

import {
	Day,
	Month,
	createCurrentDay,
	generateMonth,
	YearNumber,
	MonthName,
	generateNextMonth,
	generatePrevMonth,
	fillMonthSideWeeks,
	getMonthDays,
} from '../../date'

import Option = O.Option
import { flow } from 'fp-ts/function'

export enum ViewMode {
	day = 'day',
	week = 'week',
	month = 'month',
}

export const calendarGenerationStarted = createEvent<unknown>()
export const selectedMonthNameChanged = createEvent<MonthName>()
export const selectedMonthYearChanged = createEvent<YearNumber>()
export const nextMonthSelected = createEvent<unknown>()
export const prevMonthSelected = createEvent<unknown>()

const calculateTodayFx = createEffect<void, Day>()

export const $selectedMonth = createStore<Option<Month>>(O.none)
export const $today = createStore<Option<Day>>(O.none)

export const $daysWithFilledSideWeeks = $selectedMonth.map(
	O.map(flow(fillMonthSideWeeks, getMonthDays)),
)

$selectedMonth.on(calculateTodayFx.doneData, (_, day) =>
	O.some(generateMonth(day.month)(day.year)),
)
$selectedMonth.on(selectedMonthNameChanged, (currentMonth, monthName) =>
	O.map<Month, Month>((month) => generateMonth(monthName)(month.year))(
		currentMonth,
	),
)
$selectedMonth.on(selectedMonthYearChanged, (currentMonth, newYearNumber) =>
	O.map<Month, Month>((month) => generateMonth(month.name)(newYearNumber))(
		currentMonth,
	),
)
$selectedMonth.on(nextMonthSelected, O.map(generateNextMonth))
$selectedMonth.on(prevMonthSelected, O.map(generatePrevMonth))
$today.on(calculateTodayFx.doneData, (_, day) => O.some(day))

forward({
	from: calendarGenerationStarted,
	to: calculateTodayFx,
})

calculateTodayFx.use(createCurrentDay)
