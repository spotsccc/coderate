import { createSafeApiCall, Methods } from '@client/shared/lib/api/model';
export const { call: fetchUserByLogin, callFx: fetchUserByLoginFx } = createSafeApiCall('/user', Methods.GET);
//# sourceMappingURL=user.js.map