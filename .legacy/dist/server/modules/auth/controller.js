import { createController, Method, } from '@server/lib/controller';
import { signUp } from './sign-up';
import { login } from './login';
const controllerOptions = {
    url: 'api/auth',
};
const routes = [
    {
        path: 'login',
        method: Method.POST,
        handler: login,
    },
    {
        path: 'sign-up',
        method: Method.POST,
        handler: signUp,
    },
];
export const authController = createController(controllerOptions)(routes);
//# sourceMappingURL=controller.js.map