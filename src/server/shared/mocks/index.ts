import { Database } from '@server/lib/controller'

export const mockDbWithQueryResult = <T>(res: T[]): Database => ({
	query: jest.fn(() => Promise.resolve({
		rows: res,
		command: '',
    rowCount: res.length,
    oid: 0,
    fields: [],
	}))
})
