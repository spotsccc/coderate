import React, { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { router } from '@client/pages/router'

export const App: FC = () => (
	<BrowserRouter>
		<Switch>
			{router.map(({ path, component: Cmp, exact }) => (
				<Route path={path} exact={exact} key={path}>
					<Cmp />
				</Route>
			))}
		</Switch>
	</BrowserRouter>
)
