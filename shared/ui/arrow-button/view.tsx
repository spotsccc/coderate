import styled from 'styled-components'

export enum ArrowDirection {
	right = 'right',
	left = 'left',
}

export type ArrowButtonProps = {
	direction: ArrowDirection
}

const getArrowDirection = (direction: ArrowDirection): string => {
	switch (direction) {
		case ArrowDirection.left:
			return '/left-arrow.svg'
		case ArrowDirection.right:
			return '/right-arrow.svg'
	}
}

export const ArrowButton = styled.button<ArrowButtonProps>`
	border: none;
	background-color: inherit;
	background-image: url(${({ direction }) => getArrowDirection(direction)});
	background-repeat: no-repeat;
	cursor: pointer;
	width: 16px;
	height: 16px;
`
