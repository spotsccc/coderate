import styled from 'styled-components'
import React, { FC } from 'react'
import { Size } from '@client/shared/ui/constants'
import { StyledProps, ButtonProps, ButtonColor } from './types'
import { buttonColors, buttonSizes } from './constants'

const View = styled.button<StyledProps>`
	background: ${props => buttonColors[props.color].backgroundColor};
	cursor: pointer;
	border: 1px solid ${props => buttonColors[props.color].borderColor};
	min-width: ${(props) => buttonSizes[props.size].minWidth};
	max-width: ${(props) => buttonSizes[props.size].maxWidth};
	height: ${(props) => buttonSizes[props.size].height};
	font-size: ${(props) => buttonSizes[props.size].fontSize};
	border-radius: ${(props) => buttonSizes[props.size].borderRadius};

	&:focused {
		outline: none;
	}
`

export const Button: FC<ButtonProps> = ({
	size = Size.m,
	children,
	color = ButtonColor.white,
	text,
	...props
}) => (
	<View size={size} color={color} {...props}>
		{text || children}
	</View>
)
