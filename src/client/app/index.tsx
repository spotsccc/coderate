import React, { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { router } from '@client/pages/router'
import { GlobalStyles } from './global-styles'

export const App: FC = () => (
	<BrowserRouter>
		<GlobalStyles />
		<Switch>
			{router.map(({ path, component: Cmp, exact }) => (
				<Route path={path} exact={exact} key={path}>
					<Cmp />
				</Route>
			))}
		</Switch>
	</BrowserRouter>
)
