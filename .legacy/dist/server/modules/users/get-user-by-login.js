import * as A from 'fp-ts/Array';
import { either as E, option as O, taskEither as TE } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { DBNotFoundError, DataBaseError } from '@server/shared/errors';
export const getUserByLogin = (login) => (db) => pipe(TE.tryCatch(() => db
    .query('SELECT * FROM users WHERE login = $1', [login])
    .then((res) => A.head(res.rows)), DataBaseError.of), TE.chainEitherK(O.match(() => E.left(new DBNotFoundError('User not found')), (user) => E.right(user))));
//# sourceMappingURL=get-user-by-login.js.map