import React from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addTodo } from '../store/todoSlice'

export default function TodoInput({ text, handleInput }) {
    const dispatch = useDispatch()
    const handleAdd = () => {
        if (text.trim().length) {
            dispatch(addTodo({ text }))
            handleInput('')
        }
    }

    return (
        <InputGroup className='mb-3' size='lg'>
            <Form.Control
                placeholder='Enter some todo'
                aria-describedby='basic-addon2'
                value={text}
                onChange={e => handleInput(e.target.value)}
            />
            <Button
                size='lg'
                variant='outline-secondary'
                id='button-addon2'
                onClick={handleAdd}
            >
                Add todo
            </Button>
        </InputGroup>
    )
}
