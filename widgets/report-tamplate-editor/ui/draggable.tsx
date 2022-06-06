import { FC, MutableRefObject, useEffect, useRef } from 'react'
import { useEvent } from 'effector-react'

import { appendToRefs, dragStarted, drop, removeFromHrefs } from '../model'

export type DraggableProps = {
	id: string
}

export const Draggable: FC<DraggableProps> = ({ id, children }) => {
	const append = useEvent(appendToRefs)
	const remove = useEvent(removeFromHrefs)
	const dragE = useEvent(dragStarted)
	const dropE = useEvent(drop)
	const ref = useRef<HTMLInputElement>(null)
	useEffect(() => {
		if (ref.current !== null) {
			append({ [id]: ref as MutableRefObject<HTMLInputElement> })
		}
		return () => {
			remove(id)
		}
	}, [remove, id, append, ref])
	return (
		<div
			style={{
				cursor: 'pointer',
				width: 'max-content',
				height: 'max-content',
			}}
			ref={ref}
			onMouseDown={() => dragE(id)}
			onMouseUp={dropE}
			onDragStart={() => false}
		>
			{children}
		</div>
	)
}
