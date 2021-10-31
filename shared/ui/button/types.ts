import { Size } from '@/shared/ui/constants/size'

export enum ButtonColor {
	white = 'white',
	red = 'red',
	green = 'green',
}

export type StyledProps = {
	size: Size
	color: ButtonColor
}

export type ButtonProps = {
	onClick?: () => void
	size?: Size
	color?: ButtonColor
	text?: string
}
