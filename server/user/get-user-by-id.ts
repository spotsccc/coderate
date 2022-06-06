import { Db, ObjectId } from "mongodb";
import { option } from "fp-ts";
import { pipe } from "fp-ts/function";

import { ClientUser, mapDatabaseUserToClient, NewUserData } from "./lib";

export const getUserById = async (
  database: Db,
  id: string | ObjectId,
): Promise<option.Option<ClientUser>> => {
  const usersCollection = database.collection<NewUserData>('users')
  const _id = typeof id === 'string' ? new ObjectId(id) : id
  return pipe(
    await usersCollection.findOne({ _id }),
    option.fromNullable,
    option.map(mapDatabaseUserToClient),
  )
}
