import { ChangeEventHandler, FC } from 'react'
import { styled } from '@mui/material/styles'
import {
	Box,
	Checkbox,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material'
import { Delete } from '@mui/icons-material'

import { Todo } from '@/shared/api/daily-report'
import { Card } from '@/shared/ui/card/view'

export type TodoListBlockProps = {
	todos: Array<Todo>
	toggleTodo: (id: string) => void
	newTodoText: string
	changeNewTodoText: ChangeEventHandler<HTMLInputElement>
	addTodo: () => void
	deleteTodo: (id: string) => void
	title: string
}

export const TodoListBlock: FC<TodoListBlockProps> = ({
	todos,
	toggleTodo,
	newTodoText,
	changeNewTodoText,
	addTodo,
	deleteTodo,
	title,
}) => (
	<Card title={title}>
		<InputContainer>
			<NewTodoInput
				value={newTodoText}
				onChange={changeNewTodoText}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						addTodo()
					}
				}}
			/>
			<AddTodoButton onClick={addTodo}>+</AddTodoButton>
		</InputContainer>
		<List>
			{todos.reverse().map((todo) => (
				<TodoView
					todo={todo}
					toggleTodo={toggleTodo}
					key={todo.id}
					deleteTodo={deleteTodo}
				/>
			))}
		</List>
	</Card>
)

export type TodoProps = {
	todo: Todo
	toggleTodo: (id: string) => void
	deleteTodo: (id: string) => void
}

export const TodoView: FC<TodoProps> = ({ todo, toggleTodo, deleteTodo }) => (
	<ListItem
		disablePadding
		secondaryAction={
			<IconButton
				edge="end"
				aria-label="delete"
				onClick={() => deleteTodo(todo.id)}
			>
				<Delete />
			</IconButton>
		}
	>
		<ListItemButton
			role={undefined}
			onClick={() => toggleTodo(todo.id)}
			dense
		>
			<ListItemIcon>
				<Checkbox edge="start" checked={todo.done} tabIndex={-1} />
			</ListItemIcon>
			<ListItemText id={todo.id}>{todo.content}</ListItemText>
		</ListItemButton>
	</ListItem>
)

const NewTodoInput = styled('input')`
	box-sizing: border-box;
	width: 316px;
	height: 40px;
`

const AddTodoButton = styled('button')`
	border: none;
	width: 40px;
	height: 40px;
`

const InputContainer = styled('div')`
	display: flex;
	justify-content: space-between;
	width: 360px;
`
