import pg from 'pg'

const client = new pg.Client({
	connectionString: 'postgresql://test:password@localhost:5432/postgres',
})

await client.connect()

export const runQuery = async (query) => {
	return client.query(query).then((result) => result.rows)
}
