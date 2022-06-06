import Document, { Html, Head, Main, NextScript } from 'next/document'
import createCache from '@emotion/cache'
import createEmotionServer from '@emotion/server/create-instance'

function createEmotionCache() {
	return createCache({ key: 'css', prepend: true })
}

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<title>daily reports</title>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
					{(this.props as any).emotionStyleTags}
				</body>
			</Html>
		)
	}
}

MyDocument.getInitialProps = async (ctx: any) => {
	const originalRenderPage = ctx.renderPage
	const cache = createEmotionCache()
	const { extractCriticalToChunks } = createEmotionServer(cache)

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App: any) =>
				function EnhanceApp(props: any) {
					return <App emotionCache={cache} {...props} />
				},
		})

	const initialProps = await Document.getInitialProps(ctx)
	const emotionStyles = extractCriticalToChunks(initialProps.html)
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style
			data-emotion={`${style.key} ${style.ids.join(' ')}`}
			key={style.key}
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	))

	return {
		...initialProps,
		emotionStyleTags,
	}
}
