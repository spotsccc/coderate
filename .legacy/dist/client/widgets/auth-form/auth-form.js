import { preventDefault } from '@client/shared/lib/fp';
import React from 'react';
import styled from 'styled-components';
import { bindedViews } from './binded-views';
const { AuthStateBar, Email, Login, Password, RepeatPassword, SubmitButton } = bindedViews;
const Form = styled.form `
	display: grid;
	grid-template-rows: 60px;
	grid-auto-rows: max-content;
	row-gap: 20px;
	box-sizing: border-box;
	padding: 40px;
	position: absolute;
	border: 1px solid black;
	border-radius: 4px;
	left: calc(50% - 180px);
	top: calc(50% - 220px);
	justify-items: center;
`;
export const AuthForm = () => (React.createElement(Form, { onClick: preventDefault },
    React.createElement(AuthStateBar, null),
    React.createElement(Email, null),
    React.createElement(Login, null),
    React.createElement(Password, null),
    React.createElement(RepeatPassword, null),
    React.createElement(SubmitButton, null)));
//# sourceMappingURL=auth-form.js.map