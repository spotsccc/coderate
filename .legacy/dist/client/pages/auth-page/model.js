import { loginFx } from '@client/shared/lib/api';
import { createGate } from 'effector-react';
import { createEffect, guard } from 'effector';
export const gate = createGate('auth-gate');
const redirectFx = (url) => createEffect((history) => history.push(url));
guard({
    clock: loginFx.done,
    source: gate.state,
    filter: Boolean,
    target: redirectFx('/'),
});
//# sourceMappingURL=model.js.map