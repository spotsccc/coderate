import { either as E } from "fp-ts"
import { identity } from "fp-ts/function"
import { JwtPayload, sign } from "jsonwebtoken"
import { verifyAccessToken } from '../verify-access-token';
import { USER_ID, SECRET, INVALID_SECRET } from './constants';
import { AccessError } from '@server/shared/errors';


describe('Verify access token', () => {
	test('Valid token should be success verified', () => {
		const token = sign(USER_ID, SECRET)
		const res = E.match(() => '', identity)(verifyAccessToken(SECRET)(token))
		expect(res).toEqual(USER_ID)
	})

	test('Invalid token shouldn\'t be success verified', () => {
		const token = sign(USER_ID, SECRET)
		const res = E.match<AccessError, string | JwtPayload, AccessError>(identity, AccessError.of)(verifyAccessToken(INVALID_SECRET)(token))
		expect(res.message).toEqual(AccessError.template('invalid signature'))
	})
})
