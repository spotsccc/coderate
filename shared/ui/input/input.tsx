import React, { FC } from 'react'
import styled from 'styled-components'
import { colors, fonts, indents, Size } from '../constants'
import { inputSizes } from './constants'
import { InputProps, InputType, StyleProps } from './types'

const View = styled.input<StyleProps>`
	&:focused {
		outline: none;
	}

	width: ${(props: StyleProps) => inputSizes[props.size].width};
	height: ${(props: StyleProps) => inputSizes[props.size].height};
	border-radius: ${(props: StyleProps) => inputSizes[props.size].borderRadius};
	font-size: ${(props: StyleProps) => inputSizes[props.size].fontSize};
	padding: ${(props: StyleProps) => inputSizes[props.size].padding};
	border: 1px solid
		${(props: StyleProps) => (props.hasError ? colors.red : colors.black)};
`

const Error = styled.span`
	color: ${colors.red};
	font-size: ${fonts.s.size};
	height: 18px;
	margin-top: ${indents[1]};
`

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: min-content;
`

export const Input: FC<InputProps> = ({
	size = Size.m,
	type = InputType.text,
	hasError,
	errorText,
	...props
}) => (
	<InputContainer>
		{/*@ts-ignore*/}
		<View size={size} type={type} hasError={hasError} {...props} />
		<Error>{hasError && errorText}</Error>
	</InputContainer>
)
