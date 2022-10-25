import React from 'react'
import { ListGroup } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_TODOS, UPDATE_TODO, DELETE_TODO } from '../apollo/todos'
import TodoItem from './TodoItem'

export default function TodoList() {
    const { loading, error, data } = useQuery(ALL_TODOS)
    const [toggleTodoCompleted, { error: updateError }] = useMutation(UPDATE_TODO)
    const [handleDeleteTodo, { error: removeError }] = useMutation(
        DELETE_TODO,
        {
            update(cache, { data: { deletedTodo } }) {
                cache.modify({
                    fields: {
                        todos(currentTodos = []) {
                            return currentTodos.filter(
                                // eslint-disable-next-line no-underscore-dangle
                                item => item.__ref !== `Todo:${deletedTodo.id}`,
                            )
                        },
                    },
                })
            },
        },
    )

    if (loading) {
        return (
            <Spinner animation='border' role='status'>
                <span className='visually-hidden'>Loading...</span>
            </Spinner>
        )
    }

    if (error || updateError || removeError) {
        return (
            <h2>
                (Query allTodos) || (Mutation updateTodo || deleteTodo) error...
            </h2>
        )
    }

    return (
        <ListGroup>
            {data.todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodoCompleted={toggleTodoCompleted}
                    handleDeleteTodo={handleDeleteTodo}
                />
            ))}
        </ListGroup>
    )
}
