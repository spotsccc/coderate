import React from 'react';
import { reflect } from '@effector/reflect';
import styled from 'styled-components';
import { calendarGenerationStarted } from './model';
import { bindedViews } from './binded-views';
const { Header, MonthView } = bindedViews;
const CalendarContainer = styled.div `
	width: 1024px;
`;
export const Calendar = reflect({
    view: () => (React.createElement(CalendarContainer, null,
        React.createElement(Header, null),
        React.createElement(MonthView, null))),
    bind: {},
    hooks: {
        mounted: calendarGenerationStarted,
    },
});
//# sourceMappingURL=view.js.map