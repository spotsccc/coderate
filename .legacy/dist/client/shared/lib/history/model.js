import { createEffect, createEvent, restore, sample } from 'effector';
import { option as O } from 'fp-ts';
import { void_ } from '@client/shared/lib/fp';
export const setHistory = createEvent();
export const redirect = createEvent();
const $history = restore(setHistory.map(O.some), O.none);
const redirectFx = createEffect();
const zipParams = (history, config) => ({
    ...config,
    history,
});
sample({
    clock: redirect,
    source: $history,
    fn: zipParams,
    target: redirectFx,
});
redirectFx.use(({ history, url }) => O.match(void_, (h) => h.push(url))(history));
//# sourceMappingURL=model.js.map