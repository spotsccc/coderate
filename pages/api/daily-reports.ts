import { NextApiHandler } from 'next'
import { ObjectId } from 'mongodb'
import { either } from 'fp-ts'

import { Database } from '@/database'
import { Guard } from '@/server/guard'
import { mapId } from '@/shared/lib/mappers'

const handler: NextApiHandler = async (req, res) => {
	await Database.client.connect()
	const database = Database.client.db('db1')
	const auth = await Guard.authGuard(database, req, res)
	if (either.isLeft(auth)) {
		res.status(301).send({ error: auth.left })
		return
	}
	const dailyReportsCollection = database.collection('daily_reports')
	if (req.method === 'GET') {
		const dailyReportsArray = await dailyReportsCollection
			.find({ authorId: auth.right })
			.toArray()
		await Database.client.close()
		res.status(200).json(dailyReportsArray)
		return
	}
	if (req.method === 'POST') {
		const { insertedId } = await dailyReportsCollection.insertOne({
			...req.body.draft,
			authorId: auth.right,
		})
		const insertedReport = await dailyReportsCollection.findOne({
			_id: insertedId,
		})
		await Database.client.close()
		if (insertedReport === null) {
			res.status(500)
			return
		}
		res.status(200).json(mapId(insertedReport))
		return
	}
	if (req.method === 'PATCH') {
		await dailyReportsCollection.updateOne(
			{ _id: new ObjectId(req.body.report._id), authorId: auth.right },
			{
				$set: {
					morningState: req.body.report.morningState,
					eveningState: req.body.report.eveningState,
					dailyTodoList: req.body.report.dailyTodoList,
					morningTodoList: req.body.report.morningTodoList,
					morningAnxiety: req.body.report.morningAnxiety,
					morningMood: req.body.report.morningMood,
					eveningAnxiety: req.body.report.eveningAnxiety,
					eveningMood: req.body.report.eveningMood,
					dreamRecord: req.body.report.dreamRecord,
				},
			},
		)
		const report = await dailyReportsCollection.findOne({
			_id: new ObjectId(req.body.report._id),
			authorId: auth.right,
		})
		await Database.client.close()
		if (report === null) {
			res.status(500)
			return
		}
		res.status(200).json(mapId(report))
		return
	}
}

export default handler
