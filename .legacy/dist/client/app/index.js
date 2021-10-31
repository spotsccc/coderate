import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { router } from '@client/pages/router';
import { GlobalStyles } from './global-styles';
export const App = () => (React.createElement(BrowserRouter, null,
    React.createElement(GlobalStyles, null),
    React.createElement(Switch, null, router.map(({ path, component: Cmp, exact }) => (React.createElement(Route, { path: path, exact: exact, key: path },
        React.createElement(Cmp, null)))))));
//# sourceMappingURL=index.js.map