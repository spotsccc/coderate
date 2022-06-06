import { ChangeEvent } from 'react'

export const getTargetValue = <Element extends { value: string }>(
	e: ChangeEvent<Element>,
) => e.target.value
