import { either as E } from 'fp-ts';
import { verify } from 'jsonwebtoken';
import { AccessError } from '@server/shared/errors';
export const verifyAccessToken = (secret) => (token) => 
//@ts-ignore
E.tryCatch(() => verify(token, secret), AccessError.of);
//# sourceMappingURL=verify-access-token.js.map