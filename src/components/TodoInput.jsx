import React from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';

export default function TodoInput({ text, handleInput, handleSubmit }) {
    return (
        <InputGroup className='mb-3'>
            <Form.Control
                placeholder='Enter some todo'
                aria-label='Enter some todo'
                aria-describedby='basic-addon2'
                value={text}
                onChange={e => handleInput(e.target.value)}
            />
            <Button
                variant='outline-secondary'
                id='button-addon2'
                onClick={handleSubmit}
            >
                Add todo
            </Button>
        </InputGroup>
    );
}
