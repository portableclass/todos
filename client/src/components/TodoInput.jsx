import { useMutation } from '@apollo/client'
import React from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'
import { ALL_TODOS, ADD_TODO } from '../apollo/todos'

export default function TodoInput({ text, handleInput }) {
    const [addTodo, { error }] = useMutation(ADD_TODO, {
        update(cache, { data: { newTodo } }) {
            const { todos } = cache.readQuery({ query: ALL_TODOS })

            cache.writeQuery({
                query: ALL_TODOS,
                data: {
                    todos: [...todos, newTodo],
                },
            })
        },
    })

    const handleSubmit = () => {
        if (text.trim().length) {
            addTodo({
                variables: {
                    todo: {
                        description: text,
                        completed: false,
                        userId: 456,
                    },
                },
            })
            handleInput('')
        }
    }

    if (error) {
        return <h2>Mutation createTodo error...</h2>
    }

    return (
        <InputGroup className='mb-3' size='lg'>
            <Form.Control
                placeholder='Enter some todo'
                aria-label='Enter some todo'
                aria-describedby='basic-addon2'
                value={text}
                onChange={e => handleInput(e.target.value)}
            />
            <Button
                size='lg'
                variant='outline-secondary'
                id='button-addon2'
                onClick={handleSubmit}
                onChange={e => {
                    if (e.key === 'Enter') handleSubmit()
                }}
            >
                Add todo
            </Button>
        </InputGroup>
    )
}
