import { FC } from 'react'
import styled from 'styled-components'

export type LayoutProps = {
	Burger: FC
	MonthSelector: FC
	SearchInput: FC
	UserProfile: FC
}

export const HeaderContainer = styled.header`
	box-sizing: border-box;
	width: 100%;
	height: 68px;
	display: grid;
	grid-column-gap: 16px;
	grid-template-columns: 218px 726px 392px;
`

const BurgerSlot = styled.span`
	padding-top: 15px;
`

const UserProfileAndSearch = styled.span`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

export const HeaderLayout: FC<LayoutProps> = ({
	Burger,
	UserProfile,
	MonthSelector,
	SearchInput,
}) => (
	<HeaderContainer>
		<BurgerSlot>
			<Burger />
		</BurgerSlot>
		<MonthSelector />
		<UserProfileAndSearch>
			<SearchInput />
			<UserProfile />
		</UserProfileAndSearch>
	</HeaderContainer>
)
