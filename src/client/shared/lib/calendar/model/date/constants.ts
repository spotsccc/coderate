import { AllowedDays, MonthName, YearType } from './types'
import { Weekday } from './types'

export const MIN_AVAILABLE_YEAR = 2010
export const MAX_AVAILABLE_YEAR = 2011

export const WEEKDAY_BY_NUMBER = {
	0: Weekday.mon,
	1: Weekday.tue,
	2: Weekday.wen,
	3: Weekday.thu,
	4: Weekday.fri,
	5: Weekday.sat,
	6: Weekday.sun,
}

export const WEEKDAYS = [
	Weekday.mon,
	Weekday.tue,
	Weekday.wen,
	Weekday.thu,
	Weekday.fri,
	Weekday.sat,
	Weekday.sun,
]

export const ALLOWED_DAYS: AllowedDays = {
	[YearType.common]: {
		[MonthName.jan]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		],
		[MonthName.feb]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28,
		],
		[MonthName.mar]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		],
		[MonthName.apr]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
		],
		[MonthName.may]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		],
		[MonthName.jun]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
		],
		[MonthName.jul]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		],
		[MonthName.aug]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		],
		[MonthName.sep]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
		],
		[MonthName.oct]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		],
		[MonthName.nov]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
		],
		[MonthName.dec]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		],
	},
	[YearType.leap]: {
		[MonthName.jan]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		],
		[MonthName.feb]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29,
		],
		[MonthName.mar]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		],
		[MonthName.apr]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
		],
		[MonthName.may]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 31,
		],
		[MonthName.jun]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
		],
		[MonthName.jul]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		],
		[MonthName.aug]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		],
		[MonthName.sep]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
		],
		[MonthName.oct]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		],
		[MonthName.nov]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
		],
		[MonthName.dec]: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		],
	},
}

export const MONTH_NUMBER_BY_NAME = {
	[MonthName.jan]: 0,
	[MonthName.feb]: 1,
	[MonthName.mar]: 2,
	[MonthName.apr]: 3,
	[MonthName.may]: 4,
	[MonthName.jun]: 5,
	[MonthName.jul]: 6,
	[MonthName.aug]: 7,
	[MonthName.sep]: 8,
	[MonthName.oct]: 9,
	[MonthName.nov]: 10,
	[MonthName.dec]: 11,
}

export const MONTH_NAMES = [
	MonthName.jan,
	MonthName.feb,
	MonthName.mar,
	MonthName.apr,
	MonthName.may,
	MonthName.jun,
	MonthName.jul,
	MonthName.aug,
	MonthName.sep,
	MonthName.oct,
	MonthName.nov,
	MonthName.dec,
]

export const DAY_IN_MONTH = {
	[YearType.common]: {
		[MonthName.jan]: 31,
		[MonthName.feb]: 28,
		[MonthName.mar]: 31,
		[MonthName.apr]: 30,
		[MonthName.may]: 31,
		[MonthName.jun]: 30,
		[MonthName.jul]: 31,
		[MonthName.aug]: 31,
		[MonthName.sep]: 30,
		[MonthName.oct]: 31,
		[MonthName.nov]: 30,
		[MonthName.dec]: 31,
	},
	[YearType.leap]: {
		[MonthName.jan]: 31,
		[MonthName.feb]: 29,
		[MonthName.mar]: 31,
		[MonthName.apr]: 30,
		[MonthName.may]: 31,
		[MonthName.jun]: 30,
		[MonthName.jul]: 31,
		[MonthName.aug]: 31,
		[MonthName.sep]: 30,
		[MonthName.oct]: 31,
		[MonthName.nov]: 30,
		[MonthName.dec]: 31,
	},
}
