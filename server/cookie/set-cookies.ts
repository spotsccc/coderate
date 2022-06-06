import { serialize } from 'cookie'
import { NextApiResponse } from 'next'
import { addDays } from 'date-fns'

export const setCookies = (
	res: NextApiResponse,
	cookies: Record<string, any>,
) => {
	res.setHeader('access-control-expose-headers', 'Set-Cookie')
	res.setHeader(
		'Set-Cookie',
		Object.entries(cookies).map((cookie) =>
			serialize(cookie[0], JSON.stringify(cookie[1]), {
				httpOnly: true,
				expires: addDays(new Date(), 1000),
				path: '/',
			}),
		),
	)
}
