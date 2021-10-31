import React, { FC } from 'react'

export const renderIf =
	<Props,>(f: (_: Props) => boolean) =>
	(Component: FC<Props>) =>
	(props: Props) =>
		<>{f(props) && <Component {...props} />}</>
