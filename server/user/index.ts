import { getUserByLogin } from './get-user-by-login'
import { getUserById } from './get-user-by-id'
import { getUserByEmail } from './get-user-by-email'
import { insertUser } from './insert-user'
import { insertUserIfNotExist } from './insert-user-if-not-exist'
import { getUserByLoginOrEmailWithPassword } from './get-user-by-login-or-email-with-password'

export const User = {
	insertUser,
	getUserById,
	getUserByLogin,
	getUserByEmail,
	insertUserIfNotExist,
	getUserByLoginOrEmailWithPassword,
}
