import { pipe } from 'fp-ts/function';
import { either as E, taskEither as TE, task as T } from 'fp-ts';
import { verifyAccessToken, generateAccessToken, } from '@server/modules/access-token';
import { generateRefreshToken } from './generate-refresh-token';
import { saveRefreshTokenToken } from './save-refresh-token';
import { deleteRefreshToken } from './delete-refresh-token';
import { getRefreshToken } from './get-refresh-token-by-id';
import { isRefreshTokenValid } from './is-refresh-token-valid';
export const verifyTokens = ({ req, config, db }) => pipe(verifyAccessToken(config.jwt_secret)(req.cookies.accessToken), E.map(({ id }) => id), TE.fromEither, TE.match(() => pipe(getRefreshToken(db)(req.cookies.refreshToken), TE.chainEitherK(isRefreshTokenValid), TE.chainW((t) => pipe(deleteRefreshToken(db)(t.token), TE.map(() => generateRefreshToken(t.id)))), TE.chain((t) => saveRefreshTokenToken(t)(db)), TE.map((t) => ({
    refreshToken: t.token,
    accessToken: generateAccessToken(config.jwt_secret)(t.id),
}))), () => TE.rightTask(T.of({
    accessToken: req.cookies.accessToken,
    refreshToken: req.cookies.refreshToken,
}))), TE.fromTask, TE.flatten);
//# sourceMappingURL=verify-tokens.js.map