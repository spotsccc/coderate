import { FC } from 'react'
import { AuthPage } from '../auth-page'
import { UserProfilePage } from '../user-profile-page'
import { CalendarPage } from '../calendar-page'

export type Route = {
	path: string
	component: FC
	exact?: boolean
}

export const router: Route[] = [
	{
		path: '/auth',
		component: AuthPage,
	},
	{
		path: '/profile',
		component: UserProfilePage,
	},
	{
		path: '/calendar',
		component: CalendarPage,
	},
]
