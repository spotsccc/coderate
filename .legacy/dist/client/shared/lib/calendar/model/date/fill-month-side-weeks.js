import { MonthName } from './types';
import { calcYearType, getNextMonthName, getPrevMonthName } from './algebra';
import { ALLOWED_DAYS, WEEKDAYS } from './constants';
import { createDay } from './constructors';
export var WeekPartDirection;
(function (WeekPartDirection) {
    WeekPartDirection["forward"] = "forward";
    WeekPartDirection["backward"] = "backward";
})(WeekPartDirection || (WeekPartDirection = {}));
const createDays = (day, type) => {
    const weekday = WEEKDAYS.indexOf(day.weekday);
    const days = [];
    if (type === WeekPartDirection.backward) {
        const prevMonthName = getPrevMonthName(day.month);
        const prevMonthYear = prevMonthName === MonthName.dec ? day.year - 1 : day.year;
        const allowedDays = ALLOWED_DAYS[calcYearType(prevMonthYear)][prevMonthName];
        for (let i = weekday - 1; i > -1; i--) {
            days.push(createDay({
                number: allowedDays[allowedDays.length - weekday + i],
                year: prevMonthYear,
                month: prevMonthName,
                noteIds: [],
            }));
        }
    }
    else {
        const nextMonthName = getNextMonthName(day.month);
        const nextMonthYear = nextMonthName === MonthName.jan ? day.year + 1 : day.year;
        for (let i = weekday + 1; i <= 6; i++) {
            days.push(createDay({
                number: (i - weekday),
                month: nextMonthName,
                year: nextMonthYear,
                noteIds: [],
            }));
        }
    }
    return days;
};
export const fillMonthSideWeeks = (month) => ({
    ...month,
    days: [
        ...createDays(month.days[0], WeekPartDirection.backward).reverse(),
        ...month.days,
        ...createDays(month.days[month.days.length - 1], WeekPartDirection.forward),
    ],
});
//# sourceMappingURL=fill-month-side-weeks.js.map