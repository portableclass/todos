/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const ALL_TODOS = gql`
    query AllTodos {
        todos: allTodos {
            id
            description
            completed
        }
    }
`

export const ADD_TODO = gql`
    mutation AddTodo($todo: TodoInput!) {
        newTodo: createTodo(todo: $todo) {
            id
            description
            completed
        }
    }
`

export const UPDATE_TODO = gql`
    mutation UpdateTodo($id: ID!, $completed: Boolean!) {
        updatedTodo: updateTodo(id: $id, completed: $completed) {
            id
            description
            completed
        }
    }
`

export const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID!) {
        deletedTodoId: deleteTodo(id: $id)
    }
`
