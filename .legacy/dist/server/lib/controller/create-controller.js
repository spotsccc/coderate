import { taskEither as TE, option as O } from 'fp-ts';
import { Method } from './types';
export const createController = (options) => (routes) => (fastify) => {
    routes.forEach((route) => {
        const path = `/${options.url}/${route.path}`;
        switch (route.method) {
            case Method.GET:
                fastify.get(path, (req, rep) => TE.match((error) => {
                    console.log(error);
                    throw new Error();
                }, (response) => ({
                    response: response,
                }))(route.handler({
                    db: fastify.pg,
                    req,
                    rep,
                    config: {
                        jwt_secret: 'secret',
                    },
                    userId: O.none,
                }))());
                break;
            case Method.POST:
                fastify.post(path, (req, rep) => TE.match((error) => {
                    console.log(error);
                    throw new Error();
                }, (response) => ({
                    response: response,
                }))(route.handler({
                    db: fastify.pg,
                    req,
                    rep,
                    config: {
                        jwt_secret: 'secret',
                    },
                    userId: O.none,
                }))());
                break;
            case Method.DELETE:
                fastify.delete(path, (req, rep) => TE.match((error) => {
                    console.log(error);
                    return {
                        error: error.message,
                    };
                }, (response) => ({
                    response: response,
                }))(route.handler({
                    db: fastify.pg,
                    req,
                    rep,
                    config: {
                        jwt_secret: 'secret',
                    },
                    userId: O.none,
                }))());
                break;
            case Method.PUT:
                fastify.put(path, (req, rep) => TE.match((error) => {
                    console.log(error);
                    return {
                        error: error.message,
                    };
                }, (response) => ({
                    response: response,
                }))(route.handler({
                    db: fastify.pg,
                    req,
                    rep,
                    config: {
                        jwt_secret: 'secret',
                    },
                    userId: O.none,
                }))());
                break;
        }
    });
};
//# sourceMappingURL=create-controller.js.map