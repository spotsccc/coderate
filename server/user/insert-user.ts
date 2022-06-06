import { Db } from 'mongodb'
import { option } from 'fp-ts'

import { getUserById } from "./get-user-by-id";
import { ClientUser, createUser, NewUserData } from "./lib";

export const insertUser = async (
	database: Db,
	user: NewUserData,
): Promise<option.Option<ClientUser>> => {
	const usersCollection = database.collection<NewUserData>('users')
	const hashedUser = await createUser(user)
	const { insertedId } = await usersCollection.insertOne(hashedUser)
	return getUserById(database, insertedId)
}
