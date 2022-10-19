import React from 'react';
import { ListGroup, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { removeTodo, toggleTodoCompleted } from '../store/todoSlice'

export default function TodoItem({ todo }) {
    const dispatch = useDispatch()
    return (
        <ListGroup.Item>
            <Form.Group className='todo-item'>
                <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => dispatch(toggleTodoCompleted({ id: todo.id }))}
                />
                <span className='px-3'>{todo.description}</span>
                <span
                    onClick={() => dispatch(removeTodo({ id: todo.id }))}
                    aria-hidden='true'
                    className='delete'
                >
                    &times;
                </span>
            </Form.Group>
        </ListGroup.Item>
    );
}
