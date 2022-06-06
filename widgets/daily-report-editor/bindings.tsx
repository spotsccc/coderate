import { reflect } from '@effector/reflect/ssr'
import { option } from 'fp-ts'

import { DailyReport } from '@/entities/daily-report'
import { getTargetValue } from '@/shared/lib/fp-std/get-target-value'

import {
	$editableReport,
	$newDailyTodoText,
	$newMorningTodoText,
	addDailyTodo,
	addMorningTodo,
	changeEveningState,
	changeMorningState,
	changeNewDailyTodoText,
	changeNewMorningTodoText,
	toggleTodo,
	deleteTodo,
	changeEveningAnxiety,
	changeEveningMood,
	changeMorningAnxiety,
	changeMorningMood,
	changeDreamRecord,
} from './model'

export const MorningState = reflect({
	view: DailyReport.TextBlock,
	bind: {
		onChange: changeMorningState.prepend(getTargetValue),
		value: $editableReport.map(
			option.match(
				() => '',
				(report) => report.morningState,
			),
		),
		title: 'Morning state',
		mood: $editableReport.map(
			option.match(
				() => 0,
				(report) => report.morningMood,
			),
		),
		anxiety: $editableReport.map(
			option.match(
				() => 0,
				(report) => report.morningAnxiety,
			),
		),
		setAnxiety: changeMorningAnxiety,
		setMood: changeMorningMood,
	},
})

export const EveningState = reflect({
	view: DailyReport.TextBlock,
	bind: {
		title: 'Evening state',
		onChange: changeEveningState.prepend(getTargetValue),
		value: $editableReport.map(
			option.match(
				() => '',
				(report) => report.eveningState,
			),
		),
		mood: $editableReport.map(
			option.match(
				() => 0,
				(report) => report.eveningMood,
			),
		),
		anxiety: $editableReport.map(
			option.match(
				() => 0,
				(report) => report.eveningAnxiety,
			),
		),
		setMood: changeEveningMood,
		setAnxiety: changeEveningAnxiety,
	},
})

export const DailyTodoList = reflect({
	view: DailyReport.TodoListBlock,
	bind: {
		todos: $editableReport.map(
			option.match(
				() => [],
				(report) => report.dailyTodoList,
			),
		),
		title: 'Daily todolist',
		newTodoText: $newDailyTodoText,
		changeNewTodoText: changeNewDailyTodoText.prepend(getTargetValue),
		addTodo: addDailyTodo,
		toggleTodo: toggleTodo,
		deleteTodo: deleteTodo,
	},
})

export const MorningTodoList = reflect({
	view: DailyReport.TodoListBlock,
	bind: {
		todos: $editableReport.map(
			option.match(
				() => [],
				(report) => report.morningTodoList,
			),
		),
		toggleTodo: toggleTodo,
		deleteTodo: deleteTodo,
		addTodo: addMorningTodo,
		changeNewTodoText: changeNewMorningTodoText.prepend(getTargetValue),
		title: 'Morning todolist',
		newTodoText: $newMorningTodoText,
	},
})

export const DreamRecord = reflect({
	view: DailyReport.DreamRecord,
	bind: {
		text: $editableReport.map(
			option.match(
				() => '',
				(report) => report.dreamRecord,
			),
		),
		changeText: changeDreamRecord.prepend(getTargetValue),
	},
})
