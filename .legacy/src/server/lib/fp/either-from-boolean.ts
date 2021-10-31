import { either } from 'fp-ts'

export const eitherFromBoolean = <E>(e: E) => (b: boolean) =>
	b ? either.right(true) : either.left(e)
