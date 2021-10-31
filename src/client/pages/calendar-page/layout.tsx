import { FC } from 'react'
import React from 'react'
import styled from 'styled-components'

export type Props = {
	Header: FC<any>
	NavBar: FC<any>
	NoteList: FC<any>
	Calendar: FC<any>
}

const PagePaddingWrapper = styled.div`
	padding: 20px;
`

const Content = styled.main`
	display: grid;
	grid-template-columns: 2fr 10fr 3fr;
	grid-column-gap: 20px;
`

export const Layout: FC<Props> = ({ Header, NavBar, NoteList, Calendar }) => (
	<PagePaddingWrapper>
		<Header />
		<Content>
			<NavBar />
			<Calendar />
			<NoteList />
		</Content>
	</PagePaddingWrapper>
)
