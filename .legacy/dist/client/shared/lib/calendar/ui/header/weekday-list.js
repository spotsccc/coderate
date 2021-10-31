import React from 'react';
import styled from 'styled-components';
import { WEEKDAYS } from '../../model/date/constants';
const Weekdays = styled.div `
	display: grid;
	grid-gap: 20px;
	grid-template-columns: repeat(7, 1fr);
`;
const Weekday = styled.span `
	font-size: 24px;
	text-align: center;
`;
export const WeekdayList = () => (React.createElement(Weekdays, null, WEEKDAYS.map((name) => (React.createElement(Weekday, { key: name }, name)))));
//# sourceMappingURL=weekday-list.js.map