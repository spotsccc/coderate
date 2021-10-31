import { taskEither as TE } from 'fp-ts';
import { DBNotFoundError } from '@server/shared/errors';
export const saveRefreshTokenToken = ({ token, id, expires }) => (db) => TE.tryCatch(() => db
    .query('INSERT INTO refresh_tokens (id, user_id, expires) VALUES ($1, $2, $3)', [token, id, expires])
    .then(() => ({ token, id, expires })), DBNotFoundError.of);
//# sourceMappingURL=save-refresh-token.js.map