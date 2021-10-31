import { createEffect, createEvent, guard, sample } from 'effector';
import { option as O } from 'fp-ts';
import axios from 'axios';
import { Methods } from './api-config';
export const createApiCall = (apiConfig) => (path, method) => {
    const call = createEvent();
    const callFx = createEffect(({ config, body }) => {
        switch (method) {
            case Methods.GET:
                return axios.get(path, config);
            case Methods.POST:
                return axios.post(path, body, config);
            case Methods.DELETE:
                return axios.delete(path, config);
            case Methods.PUT:
                return axios.put(path, body, config);
        }
    });
    const guardedConfig = guard({
        clock: call,
        source: apiConfig,
        filter: O.isSome,
    });
    sample({
        clock: guardedConfig,
        source: call,
        fn: (payload, guardedConfig) => ({
            body: payload.body,
            config: { ...guardedConfig.value, params: payload.params },
        }),
        target: callFx,
    });
    return {
        call,
        callFx,
    };
};
//# sourceMappingURL=create-api-call.js.map