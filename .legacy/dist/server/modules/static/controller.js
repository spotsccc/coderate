import { createController, Method } from '@server/lib/controller';
const routes = [
    {
        path: 'bundle.js',
        method: Method.GET,
        handler: (ctx) => async () => ctx.rep.sendFile('bundle.js'),
    },
];
export const staticController = createController({ url: 'app' })(routes);
//# sourceMappingURL=controller.js.map