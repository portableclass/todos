import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'

export default function TodoList() {
    const todos = useSelector(state => state.todos.todos)

    return (
        <ListGroup>
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ListGroup>
    )
}
