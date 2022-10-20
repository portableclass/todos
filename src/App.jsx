import React, { useState } from 'react'
import './assets/styles/scss/app.scss'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

function App() {
    const [todos, setTodos] = useState([
        {
            id: new Date().toISOString(),
            description: 'text',
            completed: false,
        },
    ])
    const [text, setText] = useState('')

    const addTodo = () => {
        if (text.trim().length) {
            setTodos([
                ...todos,
                {
                    id: new Date().toISOString(),
                    description: text,
                    completed: false,
                },
            ])
            setText('')
        }
    }

    const handleDeleteTodo = todoId => {
        setTodos(todos.filter(todo => todo.id !== todoId))
    }

    const toggleTodoCompleted = todoId => {
        setTodos(
            todos.map(todo => {
                if (todo.id !== todoId) return todo

                return {
                    ...todo,
                    completed: !todo.completed,
                }
            }),
        )
    }

    return (
        <div className='app-wrapper'>
            <div className='todos-wrapper'>
                <TodoInput
                    text={text}
                    handleInput={setText}
                    handleSubmit={addTodo}
                />
                <TodoList
                    todos={todos}
                    toggleTodoCompleted={toggleTodoCompleted}
                    handleDeleteTodo={handleDeleteTodo}
                />
            </div>
        </div>
    )
}

export default App
