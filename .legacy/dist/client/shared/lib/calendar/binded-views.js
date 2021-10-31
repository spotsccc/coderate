import { reflect } from '@effector/reflect';
import { pipe } from 'fp-ts/function';
import { option as O } from 'fp-ts';
import { renderIf } from '@client/shared/lib/wrappers';
import { $daysWithFilledSideWeeks, $selectedMonth, nextMonthSelected, prevMonthSelected, getMonthName, getMonthYear, } from './model';
import { Header } from './ui/header';
import { MonthView } from './ui/view-modes/month';
import { monthViewPropsConnector, headerPropsConnector, } from './props-connectors';
export const bindedViews = {
    Header: reflect({
        view: pipe(Header, headerPropsConnector, renderIf(({ monthName }) => O.isSome(monthName))),
        bind: {
            monthName: $selectedMonth.map(O.map(getMonthName)),
            yearNumber: $selectedMonth.map(O.map(getMonthYear)),
            selectNextMonth: nextMonthSelected,
            selectPrevMonth: prevMonthSelected,
        },
    }),
    MonthView: reflect({
        view: pipe(MonthView, monthViewPropsConnector, renderIf(({ days }) => O.isSome(days))),
        bind: {
            days: $daysWithFilledSideWeeks,
        },
    }),
};
//# sourceMappingURL=binded-views.js.map