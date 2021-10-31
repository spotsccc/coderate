import React from 'react';
export const renderIf = (f) => (Component) => (props) => React.createElement(React.Fragment, null, f(props) && React.createElement(Component, { ...props }));
//# sourceMappingURL=render-if.js.map