import { pipe } from 'fp-ts/function';
import { calcIsWeekend, calcYearType, calcWeekday } from './algebra';
import { MONTH_NAMES } from '@client/shared/lib/calendar/model/date/constants';
export const createYear = (yearDto) => ({
    ...yearDto,
    yearType: calcYearType(yearDto.number),
});
export const createMonth = (monthDto) => ({
    ...monthDto,
});
export const createDay = (dayDto) => pipe(dayDto, calcWeekday, (weekday) => ({
    ...dayDto,
    weekday,
    isWeekend: calcIsWeekend(weekday),
}));
export const createCurrentDay = () => createDay({
    month: MONTH_NAMES[new Date().getMonth()],
    number: new Date().getDate(),
    year: new Date().getFullYear(),
    noteIds: [],
});
//# sourceMappingURL=constructors.js.map