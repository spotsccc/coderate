import { ChangeEvent } from 'react';
import { Size } from './../constants/size';

export enum InputType {
	text = 'text',
	password = 'password',
	email = 'email',
}

export type StyleProps = {
	size: Size
	hasError?: boolean
}

export type InputProps = {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	value: string
	onFocus?: (e: ChangeEvent<HTMLInputElement>) => void
	onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
	type?: InputType
	size?: Size
	placeholder?: string
	disabled?: boolean
	hasError?: boolean
	errorText?: string
}

export type LabeledInputProps = {
	title: string
} & InputProps
