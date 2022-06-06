import { Db } from 'mongodb'
import { ClientUser, NewUserData } from '@/server/user/lib'
import { getUserByLogin } from '@/server/user/get-user-by-login'
import { either, option } from 'fp-ts'
import { getUserByEmail } from '@/server/user/get-user-by-email'
import { insertUser } from '@/server/user/insert-user'

export const insertUserIfNotExist = async (
	database: Db,
	user: NewUserData,
): Promise<either.Either<string, ClientUser>> => {
	let existedUser = await getUserByEmail(database, user.email)
	if (option.isSome(existedUser)) {
		return either.left('User with this email already exist')
	}
	existedUser = await getUserByLogin(database, user.login)
	if (option.isSome(existedUser)) {
		return either.left('User with this login already exist')
	}
	const insertedUser = await insertUser(database, user)
	return either.fromOption(() => "Can't create user, try again later")(
		insertedUser,
	)
}
