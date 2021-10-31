import * as jwt from 'jsonwebtoken';
export const generateAccessToken = (secret) => (id) => jwt.sign({ id }, secret, { expiresIn: '10' });
//# sourceMappingURL=generate-access-token.js.map