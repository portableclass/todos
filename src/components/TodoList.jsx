import React from 'react';
import { ListGroup } from 'react-bootstrap';
import TodoItem from './TodoItem';

export default function TodoList({
    todos,
    toggleTodoCompleted,
    handleDeleteTodo,
}) {
    return (
        <ListGroup>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodoCompleted={toggleTodoCompleted}
                    handleDeleteTodo={handleDeleteTodo}
                />
            ))}
        </ListGroup>
    );
}
