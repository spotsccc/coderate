import { PathReporter } from 'io-ts/lib/PathReporter';
import * as io from 'io-ts';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import { ValidationError } from '@server/shared/errors';
export const AppConfigT = io.type({
    port: io.string,
    db_host: io.string,
    db_port: io.string,
    db_user_name: io.string,
    db_password: io.string,
    cookie_secret: io.string,
    jwt_secret: io.string,
});
export const readConfig = (variablesToRead) => (env) => variablesToRead.reduce((acc, variable) => ({ ...acc, [variable]: env[variable] }), {});
export const readMyConfig = readConfig([
    'port',
    'db_host',
    'db_user_name',
    'db_port',
    'db_password',
    'cookie_secret',
    'jwt_secret',
]);
export const validateConfig = (cfgToValidate) => pipe(AppConfigT.validate(cfgToValidate, io.getDefaultContext(AppConfigT)), E.mapLeft((err) => new ValidationError(PathReporter.report(E.left(err)).join('\n'))));
//# sourceMappingURL=config.js.map