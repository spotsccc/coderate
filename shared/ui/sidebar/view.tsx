import styled from 'styled-components'

export enum SidebarSize {
	s = 's',
	m = 'm',
	l = 'l',
}

export type SidebarProps = {
	size: SidebarSize
}

const getWidthBySidebarSize = (sidebarSize: SidebarSize): number => {
	switch (sidebarSize) {
		case SidebarSize.l:
			return 512
		case SidebarSize.m:
			return 392
		case SidebarSize.s:
			return 218
	}
}

export const Sidebar = styled.div<SidebarProps>`
	width: ${({ size }) => getWidthBySidebarSize(size)}px;
	height: 792px;
	border-radius: 7px;
	background-color: rgba(255, 255, 255, 0.2);
`
