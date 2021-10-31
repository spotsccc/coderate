import React from 'react';
import styled from 'styled-components';
import { colors, fonts, indents, Size } from '../constants';
import { inputSizes } from './constants';
import { InputType } from './types';
const View = styled.input `
	&:focused {
		outline: none;
	}

	width: ${(props) => inputSizes[props.size].width};
	height: ${(props) => inputSizes[props.size].height};
	border-radius: ${(props) => inputSizes[props.size].borderRadius};
	font-size: ${(props) => inputSizes[props.size].fontSize};
	padding: ${(props) => inputSizes[props.size].padding};
	border: 1px solid
		${(props) => (props.hasError ? colors.red : colors.black)};
`;
const Error = styled.span `
	color: ${colors.red};
	font-size: ${fonts.s.size};
	height: 18px;
	margin-top: ${indents[1]};
`;
const InputContainer = styled.div `
	display: flex;
	flex-direction: column;
	width: min-content;
`;
export const Input = ({ size = Size.m, type = InputType.text, hasError, errorText, ...props }) => (React.createElement(InputContainer, null,
    React.createElement(View, { size: size, type: type, hasError: hasError, ...props }),
    React.createElement(Error, null, hasError && errorText)));
//# sourceMappingURL=input.js.map