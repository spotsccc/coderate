import React, { FC } from 'react'
import styled from 'styled-components'
import { Header } from '@client/widgets/header'
import { Footer } from '@client/widgets/footer'

export type Props = {
	ProfileCard: FC
	ProfileFeed: FC
}

const CONTENT_WIDTH = 800

const Main = styled.div`
	width: 100vw;
	height: 100vh;
`

const Content = styled.main`
	width: ${CONTENT_WIDTH}px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 300px 500px;
`

export const Layout: FC<Props> = ({ ProfileCard, ProfileFeed }) => (
	<Main>
		<Header />
		<Content>
			<ProfileCard />
			<ProfileFeed />
		</Content>
		<Footer />
	</Main>
)
