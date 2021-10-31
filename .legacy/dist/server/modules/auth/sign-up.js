import { pipe } from 'fp-ts/function';
import { readerTaskEither as RTE } from 'fp-ts';
import { createUser, getUserByLogin } from '@server/modules/users';
import { generateTokensAndSetThemToCookie } from './generate-tokens-and-set-them-to-cookie';
export const signUp = ({ req, config, rep, db }) => pipe(createUser(req.body), RTE.chain(() => getUserByLogin(req.body.login)), RTE.chain(generateTokensAndSetThemToCookie(config)(rep)))(db);
//# sourceMappingURL=sign-up.js.map