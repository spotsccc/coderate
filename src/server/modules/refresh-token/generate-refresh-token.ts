import { randomUUID } from 'crypto';
import {addDays} from 'date-fns/fp'
import { RefreshToken } from '@server/modules/refresh-token';

export const generateRefreshToken = (id: string): RefreshToken => ({
	token: randomUUID(),
	id,
	expires: addDays(1)(new Date()),
})
