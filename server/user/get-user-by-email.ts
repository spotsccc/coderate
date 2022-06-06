import { Db } from "mongodb";
import { option } from "fp-ts";
import { pipe } from "fp-ts/function";

import { ClientUser, mapDatabaseUserToClient, NewUserData } from "./lib";

export const getUserByEmail = async (
  database: Db,
  email: string,
): Promise<option.Option<ClientUser>> => {
  const usersCollection = database.collection<NewUserData>('users')
  return pipe(
    await usersCollection.findOne({ email }),
    option.fromNullable,
    option.map(mapDatabaseUserToClient),
  )
}
