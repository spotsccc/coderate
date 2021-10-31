import { pipe } from 'fp-ts/function';
import { taskEither as TE } from 'fp-ts';
import { verifyTokens } from '@server/modules/refresh-token/verify-tokens';
import { setCookies } from '@server/lib/cookies';
export const testHandler = (context) => pipe(verifyTokens(context), TE.chainIOK((tokens) => setCookies(tokens)(context.rep)), TE.map(() => ({ data: 'dadada' })));
//# sourceMappingURL=test.js.map