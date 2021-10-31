import styled from 'styled-components';
import React from 'react';
import { Counter } from '@client/shared/ui/coutner';
import { colors, indents } from '@client/shared/ui/constants';
export const DayNumberView = styled.p `
	margin: 0;
	position: absolute;
	right: 4px;
	bottom: 4px;
	font-size: 80px;
`;
export const DayPlateView = styled.div `
	background: ${({ isWeekend }) => (isWeekend ? colors.red : colors.grey)};
	border-radius: ${indents[1]};
	position: relative;
`;
export const Day = ({ day }) => (React.createElement(DayPlateView, { isWeekend: day.isWeekend },
    React.createElement(Counter, { count: day.noteIds.length }),
    React.createElement(DayNumberView, null, day.number)));
//# sourceMappingURL=day.js.map