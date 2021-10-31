import { pipe } from 'fp-ts/function'
import { calcIsWeekend, calcYearType, calcWeekday } from './algebra'
import { DayDto, Month, MonthDto, Year, YearDto, Day, DayNumber } from './types'
import { MONTH_NAMES } from './constants'

export const createYear = (yearDto: YearDto): Year => ({
	...yearDto,
	yearType: calcYearType(yearDto.number),
})

export const createMonth = (monthDto: MonthDto): Month => ({
	...monthDto,
})

export const createDay = (dayDto: DayDto): Day =>
	pipe(dayDto, calcWeekday, (weekday) => ({
		...dayDto,
		weekday,
		isWeekend: calcIsWeekend(weekday),
	}))

export const createCurrentDay = () =>
	createDay({
		month: MONTH_NAMES[new Date().getMonth()],
		number: new Date().getDate() as DayNumber,
		year: new Date().getFullYear(),
		noteIds: [],
	})
