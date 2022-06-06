import { Db, WithId } from 'mongodb'
import { Option } from 'fp-ts/Option'
import { NewUserData } from '@/server/user/lib'
import { option } from 'fp-ts'

export const getUserByLoginOrEmailWithPassword = async (
	database: Db,
	loginOrEmail: string,
): Promise<Option<WithId<NewUserData>>> => {
	const users = database.collection<NewUserData>('users')
	let user = await users.findOne({ login: loginOrEmail })
	if (user === null) {
		user = await users.findOne({ email: loginOrEmail })
	}
	return option.fromNullable(user)
}
