import type { AppProps } from 'next/app'

import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  }
`

const MyApp = ({ Component, pageProps }: AppProps) => (
	<>
		<GlobalStyles />
		<Component {...pageProps} />
	</>
)

export default MyApp
