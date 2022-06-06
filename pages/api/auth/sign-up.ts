import { NextApiHandler } from 'next'
import { either } from 'fp-ts'

import { Database } from '@/database'
import { User } from '@/server/user'
import { Auth } from '@/server/auth'
import { Cookie } from '@/server/cookie'
import { Guard } from '@/server/guard'

const handler: NextApiHandler = async (req, res) => {
	await Database.client.connect()
	const guardedUser = Guard.signUpGuard(req.body)
	if (either.isLeft(guardedUser)) {
		res.send({ error: guardedUser.left })
		await Database.client.close()
		return
	}
	const user = guardedUser.right
	const database = Database.client.db('db1')
	const insertedUser = await User.insertUserIfNotExist(database, user)
	if (either.isLeft(insertedUser)) {
		res.send({ error: insertedUser.left })
		await Database.client.close()
		return
	}
	const tokens = await Auth.generateAndInsertTokens(
		database,
		insertedUser.right._id,
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
