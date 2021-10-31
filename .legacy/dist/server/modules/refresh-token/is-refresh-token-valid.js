import { isBefore } from 'date-fns/fp';
import { either as E } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { eitherFromBoolean } from '@server/lib/fp';
import { AccessError } from '@server/shared/errors';
export const isRefreshTokenValid = (token) => pipe(eitherFromBoolean(new AccessError('refresh token is dead'))(isBefore(token.expires)(new Date())), E.map(() => token));
//# sourceMappingURL=is-refresh-token-valid.js.map