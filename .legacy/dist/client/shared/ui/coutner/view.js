import React from 'react';
import { pipe } from 'fp-ts/function';
import { renderIf } from '@client/shared/lib/wrappers';
const View = (props) => React.createElement("div", null, props.count);
export const Counter = pipe(View, renderIf(({ count }) => count > 0));
//# sourceMappingURL=view.js.map