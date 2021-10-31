import { equals, Ord } from 'fp-ts/Ord'
import { Ord as numberOrd } from 'fp-ts/number'
import { Ord as stringOrd } from 'fp-ts/string'

import {
	Day,
	DayDto,
	DayKey,
	Month,
	MonthName,
	Weekday,
	Year,
	YearNumber,
	YearType,
} from './types'
import {
	MONTH_NAMES,
	MONTH_NUMBER_BY_NAME,
	WEEKDAY_BY_NUMBER,
} from './constants'

export const yearNumberOrd = numberOrd

export const yearOrd: Ord<Year> = {
	equals: (x, y) => equals(yearNumberOrd)(x.number)(y.number),
	compare: (first, second) =>
		yearNumberOrd.compare(first.number, second.number),
}

export const monthNameOrd: Ord<MonthName> = {
	equals: (x, y) => equals(stringOrd)(x)(y),
	compare: (x, y) =>
		numberOrd.compare(MONTH_NAMES.indexOf(x), MONTH_NAMES.indexOf(y)),
}

export const monthOrd: Ord<Month> = {
	equals: (x, y) =>
		equals(monthNameOrd)(x.name)(y.name) &&
		equals(yearNumberOrd)(x.year)(y.year),
	compare: (x, y) =>
		equals(numberOrd)(x.year)(y.year)
			? monthNameOrd.compare(x.name, y.name)
			: yearNumberOrd.compare(x.year, y.year),
}

export const dayOrd: Ord<Day> = {
	equals: (x, y) =>
		equals(numberOrd)(x.number)(y.number) &&
		equals(yearNumberOrd)(x.year)(y.year) &&
		equals(monthNameOrd)(x.month)(y.month),
	compare: (x, y) =>
		equals(monthNameOrd)(x.month)(y.month) &&
		equals(yearNumberOrd)(x.year)(y.number)
			? yearNumberOrd.compare(x.number, y.number)
			: equals(yearNumberOrd)(x.year)(y.number)
			? monthNameOrd.compare(x.month, y.month)
			: yearNumberOrd.compare(x.year, y.year),
}

export const calcIsWeekend = (weekday: Weekday): boolean =>
	weekday === Weekday.sat || weekday === Weekday.sun

export const calcYearType = (yearNumber: YearNumber): YearType =>
	yearNumber % 4 === 0 && yearNumber % 100 !== 0
		? YearType.leap
		: yearNumber % 100 === 0 && yearNumber % 400 === 0
		? YearType.leap
		: YearType.common

export const calcWeekday = (dayDto: DayDto): Weekday =>
	// @ts-ignore
	WEEKDAY_BY_NUMBER[
		new Date(
			dayDto.year,
			// @ts-ignore
			MONTH_NUMBER_BY_NAME[dayDto.month],
			dayDto.number - 1,
		).getDay()
	]

export const createKeyForDay = (day: Day): DayKey =>
	`${day.number}-${day.month}-${day.year}`

export const getNextMonthName = (currentMonth: MonthName): MonthName =>
	MONTH_NAMES[MONTH_NUMBER_BY_NAME[currentMonth] + 1] || MONTH_NAMES[0]

export const getPrevMonthName = (currentMonth: MonthName): MonthName =>
	MONTH_NAMES[MONTH_NUMBER_BY_NAME[currentMonth] - 1] ||
	MONTH_NAMES[MONTH_NAMES.length - 1]
