import { append, appendAll, $ids, $entities, update } from './model'
import { DailyReportList } from './ui/daily-report-list'
import { TextBlock } from './ui/text-block'
import { DreamRecord } from './ui/dream-record'
import { TodoListBlock } from './ui/todo-list-block'
import {} from './ui/todo-list-block'
import {
	appendMorningTodo,
	toggleTodos,
	filterTodos,
	createTodo,
	appendDailyTodo,
} from './lib'

export const DailyReport = {
	appendAll,
	append,
	$ids,
	$entities,
	update,
	DailyReportList,
	TodoListBlock,
	TextBlock,
	appendMorningTodo,
	toggleTodos,
	filterTodos,
	createTodo,
	appendDailyTodo,
	DreamRecord,
}
