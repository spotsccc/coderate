import { flow } from 'fp-ts/function';
import { readerTaskEither as RTE } from 'fp-ts';
import { setCookies } from '@server/lib/cookies';
import { generateAccessToken } from '@server/modules/access-token';
import { generateRefreshToken, saveRefreshTokenToken, } from '@server/modules/refresh-token';
export const generateTokensAndSetThemToCookie = (config) => (rep) => flow((u) => generateRefreshToken(u.id), saveRefreshTokenToken, RTE.map((refreshToken) => ({
    refreshToken: refreshToken.token,
    accessToken: generateAccessToken(config.jwt_secret)(refreshToken.id),
})), RTE.chainIOK((tokens) => setCookies(tokens)(rep)));
//# sourceMappingURL=generate-tokens-and-set-them-to-cookie.js.map