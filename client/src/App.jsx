import React, { useState } from 'react'
import './assets/styles/scss/app.scss'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

function App() {
    const [text, setText] = useState('')

    return (
        <div className='app-wrapper'>
            <div className='todos-wrapper'>
                <TodoInput
                    text={text}
                    handleInput={setText}
                />
                <TodoList />
            </div>
        </div>
    )
}

export default App
