import React, { FC } from 'react'
import styled from 'styled-components'

import { Calendar } from '@/shared/lib/calendar'
import { HeaderLayout } from '@/shared/ui/header'
import { ViewSidebar } from '@/widgets/view-sidebar/view'
import { TasksSidebar } from '@/widgets/tasks-sidebar/view'
import { BurgerButton } from '@/shared/ui/burger-button'
import { UserProfile } from '@/widgets/user-profile'
import { MonthSelector } from '@/widgets/month-selector'
import { SearchInput } from '@/shared/ui/search-input/view'
import { Background } from '@/shared/ui/background'

export const CalendarContent = styled.div`
	display: flex;
`
export type LayoutProps = {
	Header: FC
	ViewSideBar: FC
	Calendar: FC
	TasksSidebar: FC
}

const Layout: FC<LayoutProps> = ({
	Header,
	ViewSideBar,
	Calendar,
	TasksSidebar,
}) => (
	<Background>
		<Header />
		<CalendarContent>
			<ViewSideBar />
			<Calendar />
			<TasksSidebar />
		</CalendarContent>
	</Background>
)

const Header = () => (
	<HeaderLayout
		Burger={BurgerButton}
		MonthSelector={MonthSelector}
		SearchInput={SearchInput}
		UserProfile={UserProfile}
	/>
)

const CalendarPage = () => (
	<Layout
		Header={Header}
		ViewSideBar={ViewSidebar}
		Calendar={Calendar}
		TasksSidebar={TasksSidebar}
	/>
)

export default CalendarPage
