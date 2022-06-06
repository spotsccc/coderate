import { createEvent, createStore } from 'effector'
import { DailyReportT } from '@/shared/api/daily-report'

export const $ids = createStore<Array<string>>([])
export const $entities = createStore<Record<string, DailyReportT>>({})

export const append = createEvent<DailyReportT>()
export const appendAll = createEvent<Array<DailyReportT>>()
export const update = createEvent<DailyReportT>()

$ids
	.on(append, (ids, appendedEntity) => [...ids, appendedEntity._id])
	.on(appendAll, (ids, appendedEntity) => [
		...ids,
		...appendedEntity.map((entity) => entity._id),
	])

$entities
	.on(append, (entities, appendedEntity) => ({
		...entities,
		[appendedEntity._id]: appendedEntity,
	}))
	.on(appendAll, (entities, appendedEntities) => ({
		...entities,
		...appendedEntities.reduce(
			(acc, entity) => ({
				...acc,
				[entity._id]: entity,
			}),
			{},
		),
	}))
	.on(update, (entities, updatedEntity) => ({
		...entities,
		[updatedEntity._id]: updatedEntity,
	}))
