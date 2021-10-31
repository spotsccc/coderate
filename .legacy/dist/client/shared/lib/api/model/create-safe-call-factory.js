import { redirect } from '@client/shared/lib/history';
import { createApiCall } from './create-api-call';
export const createSafeCallFactory = (config) => (path, method) => {
    const { call, callFx } = createApiCall(config)(path, method);
    callFx.failData.watch((err) => {
        switch (err.response.status) {
            case 401:
                redirect({ url: '/unauthorized' });
                break;
            case 403:
                redirect({ url: '/access-denied' });
                break;
            default:
                redirect({ url: '/unhandled-request-error' });
        }
    });
    return { call, callFx };
};
//# sourceMappingURL=create-safe-call-factory.js.map