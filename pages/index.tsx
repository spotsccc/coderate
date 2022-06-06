import { allSettled, fork, serialize } from 'effector'
import { IndexPage } from '@/pages-fsd/index'
import { setContext } from '@/shared/api/base-request'
import { GetServerSidePropsContext } from 'next'
import { option } from 'fp-ts'

export default IndexPage.View

export const getServerSideProps = async (
	context: GetServerSidePropsContext,
) => {
	const scope = fork()
	if (context.req && context.res) {
		await allSettled(setContext, {
			scope,
			params: option.some(context),
		})
	}
	await allSettled(IndexPage.pageLoadStarted, { scope })
	await allSettled(IndexPage.pageLoaded, { scope })
	await allSettled(setContext, {
		scope,
		params: option.none,
	})
	return {
		props: {
			initialState: serialize(scope),
		},
	}
}
