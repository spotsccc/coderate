import { identity } from 'fp-ts/function'

export const isAllValuesTruthy = (...args: boolean[]) => args.every(identity)
