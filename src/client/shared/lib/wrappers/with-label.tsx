import React from 'react'
import { FC } from 'react'

export const withLabel =
	<Props extends {}>(Component: FC<Props>) =>
	(props: { text: string } & Props) =>
		(
			<>
				<span>{props.text}</span>
				<Component {...props} />
			</>
		)
