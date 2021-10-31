import React from 'react';
import styled from 'styled-components';
import { indents } from '@client/shared/ui/constants';
import { createKeyForDay } from '../../../model';
import { Day } from './day';
const MonthContainer = styled.div `
	padding: ${indents[4]};
	height: 736px;
	box-sizing: border-box;
	display: grid;
	max-height: calc(100vh - 80px);
	overflow: auto;
	grid-gap: ${indents[4]};
	grid-template-columns: repeat(7, 1fr);
`;
export const MonthView = ({ days }) => {
    return (React.createElement(MonthContainer, null, days.map((day) => (React.createElement(Day, { day: day, key: createKeyForDay(day) })))));
};
//# sourceMappingURL=view.js.map