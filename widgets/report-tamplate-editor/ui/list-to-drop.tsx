import { FC, MutableRefObject, useEffect, useRef } from 'react'
import { useEvent } from 'effector-react'
import { appendToLists, removeFromLists } from '../model'
import { Box } from '@mui/material'

export type ListToDropProps = {
	id: string
}

export const ListToDrop: FC<ListToDropProps> = ({ children, id }) => {
	const append = useEvent(appendToLists)
	const remove = useEvent(removeFromLists)
	const ref = useRef<HTMLInputElement>(null)
	useEffect(() => {
		if (ref.current !== null) {
			append({ id, ref: ref as MutableRefObject<HTMLInputElement> })
		}
		return () => {
			remove(id)
		}
	}, [append, remove, ref, id])
	return <Box ref={ref}>{children}</Box>
}
