import React, { FC } from 'react'
import { pipe } from 'fp-ts/function'

import { renderIf } from '@client/shared/lib/wrappers'

export type Props = {
	count: number
}

const View: FC<Props> = (props) => <div>{props.count}</div>

export const Counter = pipe(
	View,
	renderIf(({ count }) => count > 0),
)
