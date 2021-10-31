import React from 'react';
export const withLabel = (Component) => (props) => (React.createElement(React.Fragment, null,
    React.createElement("span", null, props.text),
    React.createElement(Component, { ...props })));
//# sourceMappingURL=with-label.js.map