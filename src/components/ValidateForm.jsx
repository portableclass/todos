import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form, FloatingLabel } from 'react-bootstrap'

export default function ValidateForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = data => {
        console.log(data)
    }

    return (
        <>
            <h1 className='text-white text-center mb-3'>Example form</h1>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                className='bg-white p-3 rounded'
            >
                <Form.Group className='mb-3'>
                    <FloatingLabel className='' label='Email address'>
                        <Form.Control
                            type='text'
                            placeholder='Enter email'
                            {...register('email', {
                                required: 'Email is required',
                            })}
                            className={errors.email ? 'is-invalid' : ''}
                        />
                    </FloatingLabel>
                    {errors.email && (
                        <p className='text-danger mt-3'>{errors.email?.message}</p>
                    )}
                </Form.Group>

                <Form.Group className='mb-3'>
                    <FloatingLabel label='Password'>
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            {...register('password', {
                                required: 'Password is required',
                            })}
                            className={errors.password ? 'is-invalid' : ''}
                        />
                    </FloatingLabel>
                    {errors.password && (
                        <p className='text-danger mt-3'>{errors.password?.message}</p>
                    )}
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </>
    )
}
