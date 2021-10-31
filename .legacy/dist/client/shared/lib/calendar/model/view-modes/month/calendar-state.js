import { createEffect, createEvent, createStore, forward } from 'effector';
import { option as O } from 'fp-ts';
import { createCurrentDay, generateMonth, generateNextMonth, generatePrevMonth, } from '../../date';
import { fillMonthSideWeeks } from '@client/shared/lib/calendar/model/date/fill-month-side-weeks';
import { flow } from 'fp-ts/function';
import { getMonthDays } from '@client/shared/lib/calendar/model/date/getters';
export var ViewMode;
(function (ViewMode) {
    ViewMode["day"] = "day";
    ViewMode["week"] = "week";
    ViewMode["month"] = "month";
})(ViewMode || (ViewMode = {}));
export const calendarGenerationStarted = createEvent();
export const selectedMonthNameChanged = createEvent();
export const selectedMonthYearChanged = createEvent();
export const nextMonthSelected = createEvent();
export const prevMonthSelected = createEvent();
const calculateTodayFx = createEffect();
export const $selectedMonth = createStore(O.none);
export const $today = createStore(O.none);
export const $daysWithFilledSideWeeks = $selectedMonth.map(O.map(flow(fillMonthSideWeeks, getMonthDays)));
$daysWithFilledSideWeeks.watch(console.log);
$selectedMonth.on(calculateTodayFx.doneData, (_, day) => O.some(generateMonth(day.month)(day.year)));
$selectedMonth.on(selectedMonthNameChanged, (currentMonth, monthName) => O.map((month) => generateMonth(monthName)(month.year))(currentMonth));
$selectedMonth.on(selectedMonthYearChanged, (currentMonth, newYearNumber) => O.map((month) => generateMonth(month.name)(newYearNumber))(currentMonth));
$selectedMonth.on(nextMonthSelected, O.map(generateNextMonth));
$selectedMonth.on(prevMonthSelected, O.map(generatePrevMonth));
$today.on(calculateTodayFx.doneData, (_, day) => O.some(day));
forward({
    from: calendarGenerationStarted,
    to: calculateTodayFx,
});
calculateTodayFx.use(createCurrentDay);
//# sourceMappingURL=calendar-state.js.map