import React from 'react';
import { TabButton } from './ui';
export const TabBar = (props) => (React.createElement("div", null, props.options.map((opt) => (React.createElement(TabButton
//@ts-ignore
, { 
    //@ts-ignore
    key: opt.id, selected: props.selectedOption === opt.id, onClick: () => props.onButtonClick(opt.id) }, opt.text)))));
//# sourceMappingURL=tab-bar.js.map