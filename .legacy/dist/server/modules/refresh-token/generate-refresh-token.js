import { randomUUID } from 'crypto';
import { addDays } from 'date-fns/fp';
export const generateRefreshToken = (id) => ({
    token: randomUUID(),
    id,
    expires: addDays(1)(new Date()),
});
//# sourceMappingURL=generate-refresh-token.js.map