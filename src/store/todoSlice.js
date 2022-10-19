import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    todos: [
        {
            id: new Date().toISOString(),
            description: 'text',
            completed: false,
        },
    ],
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({
                id: new Date().toISOString(),
                description: action.payload.text,
                completed: false,
            })
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(
                todo => todo.id !== action.payload.id,
            )
        },
        toggleTodoCompleted: (state, action) => {
            const toggleTodo = state.todos.find(
                todo => todo.id === action.payload.id,
            )
            toggleTodo.completed = !toggleTodo.completed
        },
    },
})

export const { addTodo, removeTodo, toggleTodoCompleted } = todoSlice.actions

export default todoSlice.reducer
