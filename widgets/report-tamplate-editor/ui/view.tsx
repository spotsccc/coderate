import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import { FC, useEffect } from 'react'
import { useEvent, useStore } from 'effector-react'

import {
	$blockIdsByListId,
	$blocks,
	BlockArray,
	BlockConfig,
	BlockTitleMap,
	BlockType,
	widgetMounted,
	widgetUnmounted,
} from '../model'
import { ListToDrop } from './list-to-drop'
import { Draggable } from './draggable'

export const View = () => {
	const mounted = useEvent(widgetMounted)
	const unmounted = useEvent(widgetUnmounted)
	const blockIdsByListId = useStore($blockIdsByListId)
	const blocks = useStore($blocks)
	useEffect(() => {
		mounted()
		return () => unmounted()
	}, [mounted, unmounted])
	return (
		<Box sx={{ display: 'flex' }}>
			<List sx={{ width: 200 }}>
				{BlockArray.map((type) => (
					<BlockTemplate id={type} type={type} key={type} />
				))}
			</List>
			<ListToDrop id={'0'}>
				<Box
					sx={{
						width: '720px',
						height: '720px',
						border: 'solid black 1px',
						display: 'flex',
						flexWrap: 'wrap',
					}}
				>
					{blockIdsByListId['0']?.map((id) => (
						<BlockConfigView blockConfig={blocks[id]} key={id} />
					))}
				</Box>
			</ListToDrop>
		</Box>
	)
}

export type BlockProps = {
	type: BlockType
	id: string
}

export const BlockTemplate: FC<BlockProps> = ({ type, id }) => (
	<Draggable id={id}>
		<ListItem>
			<ListItemText>{BlockTitleMap[type]}</ListItemText>
		</ListItem>
	</Draggable>
)

export type BlockConfigViewProps = {
	blockConfig: BlockConfig
}

export const BlockConfigView: FC<BlockConfigViewProps> = ({ blockConfig }) => (
	<Draggable id={blockConfig.id}>
		<Box
			sx={{
				width: '360px',
				height: '360px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Typography>{blockConfig.title}</Typography>
		</Box>
	</Draggable>
)
