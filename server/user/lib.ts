import { ObjectId, WithId } from 'mongodb'
import { pipe } from 'fp-ts/function'
import { omit } from '@/shared/lib/ts'
import { genSalt, hash } from 'bcrypt'
import { mapId } from '@/shared/lib/mappers'

export const hashPassword = async (password: string): Promise<string> =>
	hash(password, await genSalt(10))

export const createUser = async (user: NewUserData): Promise<NewUserData> => ({
	...user,
	password: await hashPassword(user.password),
})

export type NewUserData = {
	password: string
	login: string
	email: string
}

export type ClientUser = Omit<NewUserData, 'password'> & {
	_id: string
}

export const mapDatabaseUserToClient = (
	user: WithId<NewUserData>,
): ClientUser => pipe(omit(user, 'password'), (e) => e, mapId)
