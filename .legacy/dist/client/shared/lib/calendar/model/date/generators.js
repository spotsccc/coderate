import { createDay, createMonth, createYear } from './constructors';
import { calcYearType, getNextMonthName, getPrevMonthName } from './algebra';
import { MonthName } from './types';
import { ALLOWED_DAYS, MONTH_NAMES } from './constants';
export const generateMonth = (name) => (year) => createMonth({
    days: ALLOWED_DAYS[calcYearType(year)][name].map((number) => createDay({
        number,
        noteIds: [],
        year,
        month: name,
    })),
    year,
    name,
});
export const generateNextMonth = (month) => {
    const nextMonthName = getNextMonthName(month.name);
    const nextMonthYear = nextMonthName === MonthName.jan ? month.year + 1 : month.year;
    return generateMonth(nextMonthName)(nextMonthYear);
};
export const generatePrevMonth = (month) => {
    const prevMonthName = getPrevMonthName(month.name);
    const prevMonthYear = prevMonthName === MonthName.dec ? month.year - 1 : month.year;
    return generateMonth(prevMonthName)(prevMonthYear);
};
export const generateYear = (number) => createYear({
    months: MONTH_NAMES.map((name) => {
        return generateMonth(name)(number);
    }).reduce((acc, month) => ({
        ...acc,
        [month.name]: month,
    }), {}),
    number,
});
//# sourceMappingURL=generators.js.map