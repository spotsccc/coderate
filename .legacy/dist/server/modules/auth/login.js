import { readerTaskEither as RTE } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { getUserByLogin } from '@server/modules/users';
import { generateTokensAndSetThemToCookie } from './generate-tokens-and-set-them-to-cookie';
export const login = ({ req, rep, db, config }) => {
    return pipe(getUserByLogin(req.body.login), RTE.chain(generateTokensAndSetThemToCookie(config)(rep)))(db);
};
//# sourceMappingURL=login.js.map