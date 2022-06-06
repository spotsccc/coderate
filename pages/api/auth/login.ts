import { NextApiHandler } from 'next'
import { either, option } from 'fp-ts'
import { compare } from 'bcrypt'

import { Database } from '@/database'
import { Cookie } from '@/server/cookie'
import { User } from '@/server/user'
import { Guard } from '@/server/guard'
import { Auth } from '@/server/auth'

const handler: NextApiHandler = async (req, res) => {
	await Database.client.connect()
	const { loginOrEmail, password } = req.body
	const guardedLogin = Guard.loginGuard(req.body)
	if (either.isLeft(guardedLogin)) {
		res.send({ error: guardedLogin.left })
		await Database.client.close()
		return
	}
	const database = Database.client.db('db1')
	let user = await User.getUserByLoginOrEmailWithPassword(
		database,
		loginOrEmail,
	)
	if (option.isNone(user)) {
		res.send({ error: "User doesn't exist" })
		await Database.client.close()
		return
	}
	if (!(await compare(password, user.value.password))) {
		res.status(500).send({
			error: 'Invalid password',
		})
		await Database.client.close()
		return
	}
	const tokens = await Auth.generateAndInsertTokens(
		database,
		user.value._id.toHexString(),
	)
	if (either.isLeft(tokens)) {
		res.send({ error: tokens.left })
		await Database.client.close()
		return
	}
	const { accessToken, refreshToken } = tokens.right
	Cookie.setCookies(res, { refreshToken, accessToken })
	res.status(200).send({ accessToken, refreshToken })
	await Database.client.close()
	return
}

export default handler
