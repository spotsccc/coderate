import { pipe } from 'fp-ts/function';
import { task as T, taskEither as TE } from 'fp-ts';
import { hash, genSalt } from 'bcrypt';
import { DataBaseError } from '@server/shared/errors';
export const createUser = (u) => (db) => pipe(hashPassword(u.password), T.map((password) => ({ ...u, password })), TE.fromTask, TE.chain(({ password, login, email }) => TE.tryCatch(() => db
    .query('INSERT INTO users (login, password, email) VALUES ($1, $2, $3)', [login, password, email])
    .then((res) => res.rows[0]), DataBaseError.of)));
export const hashPassword = (password) => pipe(() => genSalt(10), T.chain(salt => () => hash(password, salt)));
//# sourceMappingURL=create-user.js.map