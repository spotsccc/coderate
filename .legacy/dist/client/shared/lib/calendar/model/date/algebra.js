import { equals } from 'fp-ts/Ord';
import { Ord as numberOrd } from 'fp-ts/number';
import { Ord as stringOrd } from 'fp-ts/string';
import { Weekday, YearType, } from './types';
import { MONTH_NAMES, MONTH_NUMBER_BY_NAME, WEEKDAY_BY_NUMBER, } from './constants';
export const yearNumberOrd = numberOrd;
export const yearOrd = {
    equals: (x, y) => equals(yearNumberOrd)(x.number)(y.number),
    compare: (first, second) => yearNumberOrd.compare(first.number, second.number),
};
export const monthNameOrd = {
    equals: (x, y) => equals(stringOrd)(x)(y),
    compare: (x, y) => numberOrd.compare(MONTH_NAMES.indexOf(x), MONTH_NAMES.indexOf(y)),
};
export const monthOrd = {
    equals: (x, y) => equals(monthNameOrd)(x.name)(y.name) &&
        equals(yearNumberOrd)(x.year)(y.year),
    compare: (x, y) => equals(numberOrd)(x.year)(y.year)
        ? monthNameOrd.compare(x.name, y.name)
        : yearNumberOrd.compare(x.year, y.year),
};
export const dayOrd = {
    equals: (x, y) => equals(numberOrd)(x.number)(y.number) &&
        equals(yearNumberOrd)(x.year)(y.year) &&
        equals(monthNameOrd)(x.month)(y.month),
    compare: (x, y) => equals(monthNameOrd)(x.month)(y.month) &&
        equals(yearNumberOrd)(x.year)(y.number)
        ? yearNumberOrd.compare(x.number, y.number)
        : equals(yearNumberOrd)(x.year)(y.number)
            ? monthNameOrd.compare(x.month, y.month)
            : yearNumberOrd.compare(x.year, y.year),
};
export const calcIsWeekend = (weekday) => weekday === Weekday.sat || weekday === Weekday.sun;
export const calcYearType = (yearNumber) => yearNumber % 4 === 0 && yearNumber % 100 !== 0
    ? YearType.leap
    : yearNumber % 100 === 0 && yearNumber % 400 === 0
        ? YearType.leap
        : YearType.common;
export const calcWeekday = (dayDto) => 
// @ts-ignore
WEEKDAY_BY_NUMBER[new Date(dayDto.year, 
// @ts-ignore
MONTH_NUMBER_BY_NAME[dayDto.month], dayDto.number - 1).getDay()];
export const createKeyForDay = (day) => `${day.number}-${day.month}-${day.year}`;
export const getNextMonthName = (currentMonth) => MONTH_NAMES[MONTH_NUMBER_BY_NAME[currentMonth] + 1] || MONTH_NAMES[0];
export const getPrevMonthName = (currentMonth) => MONTH_NAMES[MONTH_NUMBER_BY_NAME[currentMonth] - 1] ||
    MONTH_NAMES[MONTH_NAMES.length - 1];
//# sourceMappingURL=algebra.js.map