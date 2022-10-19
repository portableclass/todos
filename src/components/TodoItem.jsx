import React from 'react';
import { ListGroup, Form } from 'react-bootstrap';

export default function TodoItem({
    todo,
    toggleTodoCompleted,
    handleDeleteTodo,
}) {
    return (
        <ListGroup.Item>
            <Form.Group className='todo-item'>
                <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => toggleTodoCompleted(todo.id)}
                />
                <span className='px-3'>{todo.description}</span>
                <span
                    onClick={() => handleDeleteTodo(todo.id)}
                    aria-hidden='true'
                    className='delete'
                >
                    &times;
                </span>
            </Form.Group>
        </ListGroup.Item>
    );
}
