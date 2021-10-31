import React from 'react';
import { getSomeValue } from '@client/shared/lib/fp/get-value';
export const headerPropsConnector = (Header) => ({ monthName, yearNumber, ...props }) => (React.createElement(Header, { monthName: getSomeValue(monthName), yearNumber: getSomeValue(yearNumber), ...props }));
export const monthViewPropsConnector = (MonthView) => ({ days, ...props }) => React.createElement(MonthView, { days: days.value, ...props });
//# sourceMappingURL=props-connectors.js.map