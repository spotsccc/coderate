import { either } from 'fp-ts';
export const eitherFromBoolean = (e) => (b) => b ? either.right(true) : either.left(e);
//# sourceMappingURL=either-from-boolean.js.map