import { option } from 'fp-ts'

export const getUnsafeValue = <Value>(o: option.Option<Value>) =>
	(o as option.Some<Value>).value
