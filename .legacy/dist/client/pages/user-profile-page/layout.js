import React from 'react';
import styled from 'styled-components';
import { Header } from '@client/widgets/header';
import { Footer } from '@client/widgets/footer';
const CONTENT_WIDTH = 800;
const Main = styled.div `
	width: 100vw;
	height: 100vh;
`;
const Content = styled.main `
	width: ${CONTENT_WIDTH}px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 300px 500px;
`;
export const Layout = ({ ProfileCard, ProfileFeed }) => (React.createElement(Main, null,
    React.createElement(Header, null),
    React.createElement(Content, null,
        React.createElement(ProfileCard, null),
        React.createElement(ProfileFeed, null)),
    React.createElement(Footer, null)));
//# sourceMappingURL=layout.js.map