import type { NextPage } from 'next'
import { fork } from 'effector'

export const getStaticProps = () => {
	const scope = fork()
	return {
		props: {},
	}
}

const Home: NextPage = () => {
	return <div>kek</div>
}

export default Home
