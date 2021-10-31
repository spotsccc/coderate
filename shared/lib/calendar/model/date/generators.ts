import { createDay, createMonth, createYear } from './constructors'
import { calcYearType, getNextMonthName, getPrevMonthName } from './algebra'
import { DayNumber, Month, MonthName, Year, YearNumber } from './types'
import { ALLOWED_DAYS, MONTH_NAMES } from './constants'

export const generateMonth =
	(name: MonthName) =>
	(year: YearNumber): Month =>
		createMonth({
			days: ALLOWED_DAYS[calcYearType(year)][name].map((number: DayNumber) =>
				createDay({
					number,
					noteIds: [],
					year,
					month: name,
				}),
			),
			year,
			name,
		})

export const generateNextMonth = (month: Month): Month => {
	const nextMonthName = getNextMonthName(month.name)
	const nextMonthYear =
		nextMonthName === MonthName.jan ? month.year + 1 : month.year
	return generateMonth(nextMonthName)(nextMonthYear)
}

export const generatePrevMonth = (month: Month): Month => {
	const prevMonthName = getPrevMonthName(month.name)
	const prevMonthYear =
		prevMonthName === MonthName.dec ? month.year - 1 : month.year
	return generateMonth(prevMonthName)(prevMonthYear)
}

export const generateYear = (number: YearNumber): Year =>
	createYear({
		months: MONTH_NAMES.map((name) => {
			return generateMonth(name)(number)
		}).reduce(
			(acc, month) => ({
				...acc,
				[month.name]: month,
			}),
			{},
		) as Record<MonthName, Month>,
		number,
	})
