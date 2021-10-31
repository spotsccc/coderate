import { ChangeEvent } from 'react'
import { Some } from 'fp-ts/Option'

export const getValue = (e: ChangeEvent<HTMLInputElement>) => e.target.value
export const getSomeValue = <Value>(s: Some<Value>) => s.value
