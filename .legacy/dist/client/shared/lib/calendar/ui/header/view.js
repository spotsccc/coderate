import React from 'react';
import styled from 'styled-components';
import { WeekdayList } from './weekday-list';
export const CurrentMonthName = styled.p `
	font-size: 24px;
	margin: 0;
`;
const HeaderContainer = styled.header `
	display: flex;
	width: 100%;
	padding: 0 20px;
	background: white;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
	height: 80px;
`;
export const Header = ({ monthName, yearNumber, selectNextMonth, selectPrevMonth, }) => (React.createElement(HeaderContainer, null,
    React.createElement("div", null,
        React.createElement("button", { onClick: selectPrevMonth }, "-"),
        React.createElement(CurrentMonthName, null, monthName),
        React.createElement(CurrentMonthName, null, yearNumber),
        React.createElement("button", { onClick: selectNextMonth }, "+")),
    React.createElement(WeekdayList, null)));
//# sourceMappingURL=view.js.map