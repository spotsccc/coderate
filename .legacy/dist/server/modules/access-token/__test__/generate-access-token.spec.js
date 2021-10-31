import { verify } from 'jsonwebtoken';
import { generateAccessToken } from '../generate-access-token';
import { SECRET, USER_ID, INVALID_SECRET } from './constants';
describe('Access token should be valid JWT.', () => {
    test('Token should contain userId', () => {
        const token = generateAccessToken(SECRET)(USER_ID);
        expect(verify(token, SECRET)).toEqual(USER_ID);
    });
    test('Token with wrong secret should be invalid', () => {
        const token = generateAccessToken(SECRET)(USER_ID);
        expect(() => verify(token, INVALID_SECRET)).toThrow('invalid signature');
    });
});
//# sourceMappingURL=generate-access-token.spec.js.map