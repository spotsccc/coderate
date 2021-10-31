export enum Weekday {
	mon = 'mon',
	tue = 'tue',
	wen = 'wen',
	thu = 'thu',
	fri = 'fri',
	sat = 'sat',
	sun = 'sun',
}

export type DayNumber =
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23
	| 24
	| 25
	| 26
	| 27
	| 28
	| 29
	| 30
	| 31

export type Day = {
	month: MonthName
	number: DayNumber
	weekday: Weekday
	year: YearNumber
	isWeekend: boolean
	noteIds: number[]
}

export type Week = {
	days: Day[]
}

export type DayDto = {
	number: DayNumber
	month: MonthName
	year: YearNumber
	noteIds: number[]
}

export enum MonthName {
	jan = 'January',
	feb = 'February',
	mar = 'March',
	apr = 'April',
	may = 'May',
	jun = 'June',
	jul = 'July',
	aug = 'August',
	sep = 'September',
	oct = 'October',
	nov = 'November',
	dec = 'December',
}

export type MonthNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export type AllowedDays = Record<YearType, Record<MonthName, DayNumber[]>>

export type Month = {
	name: MonthName
	year: YearNumber
	days: Day[]
}

export type MonthDto = {
	name: MonthName
	year: YearNumber
	days: Day[]
}

export enum YearType {
	common = 'common',
	leap = 'leap',
}

export type YearNumber = number

export type Year = {
	yearType: YearType
	number: YearNumber
	months: Record<MonthName, Month>
}

export type YearDto = {
	number: YearNumber
	months: Record<MonthName, Month>
}

export type DayKey = `${DayNumber}-${MonthName}-${YearNumber}`
