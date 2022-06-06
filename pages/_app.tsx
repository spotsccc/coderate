import { GlobalStyles } from '@mui/material'
import { Scope, fork, serialize } from 'effector'
import { Provider } from 'effector-react/scope'

let clientScope: Scope

export default function App({ Component, pageProps }: any) {
	const scope = fork({
		values: {
			...(clientScope && serialize(clientScope)),
			...pageProps.initialState,
		},
	})
	if (typeof window !== 'undefined') clientScope = scope
	return (
		<Provider value={scope}>
			<Component {...pageProps} />
			<GlobalStyles styles={{ margin: '0' }} />
		</Provider>
	)
}
