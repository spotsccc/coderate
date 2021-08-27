import React, { FC } from 'react'
import { AuthPage } from '../auth-page'
import { MainPage } from '../main-page'

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
		path: '/',
		component: MainPage,
		exact: true
	},
]
