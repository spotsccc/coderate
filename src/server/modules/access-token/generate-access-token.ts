import * as jwt from 'jsonwebtoken'

export const generateAccessToken = (secret: string) => (id: string) =>
	jwt.sign({id}, secret, {expiresIn: '10'})
