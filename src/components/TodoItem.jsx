import React from 'react';
import { ListGroup, Form } from 'react-bootstrap'

export default function TodoItem({ todo, toggleTodoCompleted, handleDeleteTodo }) {
    return (
        <ListGroup.Item>
            <Form.Group className='todo-item' controlId='formBasicCheckbox'>
                <Form.Check
                    type='checkbox'
                    label={todo.description}
                    checked={todo.completed}
                    onChange={() => toggleTodoCompleted(todo.id)}
                />
                <span
                    onClick={() => handleDeleteTodo(todo.id)}
                    aria-hidden='true'
                >
                    &times;
                </span>
            </Form.Group>
        </ListGroup.Item>
    );
}
