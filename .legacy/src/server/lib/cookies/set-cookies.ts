import { FastifyReply } from 'fastify'

export const setCookies =
	(cookies: Record<string, string>) => (rep: FastifyReply) => () => {
		Object.entries(cookies).forEach((cookie) => {
			//@ts-ignore
			rep.setCookie(cookie[0], cookie[1], {httpOnly: true, path: '/'})
			rep.header('access-control-expose-headers', 'Set-Cookie')
		})
		return cookies
	}
