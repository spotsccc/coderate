import React from 'react';
import styled from 'styled-components';
const PagePaddingWrapper = styled.div `
	padding: 20px;
`;
const Content = styled.main `
	display: grid;
	grid-template-columns: 2fr 10fr 3fr;
	grid-column-gap: 20px;
`;
export const Layout = ({ Header, NavBar, NoteList, Calendar }) => (React.createElement(PagePaddingWrapper, null,
    React.createElement(Header, null),
    React.createElement(Content, null,
        React.createElement(NavBar, null),
        React.createElement(Calendar, null),
        React.createElement(NoteList, null))));
//# sourceMappingURL=layout.js.map