import { Db } from 'mongodb'
import { option } from 'fp-ts'
import { pipe } from 'fp-ts/function'

import { ClientUser, mapDatabaseUserToClient, NewUserData } from "./lib";

export const getUserByLogin = async (
	database: Db,
	login: string,
): Promise<option.Option<ClientUser>> => {
	const usersCollection = database.collection<NewUserData>('users')
	return pipe(
		await usersCollection.findOne({ login }),
		option.fromNullable,
		option.map(mapDatabaseUserToClient),
	)
}
