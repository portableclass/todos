/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const ALL_TODOS = gql`
    query AllTodos {
        todos {
            id
            description
            completed
        }
    }
`

export const ADD_TODO = gql`
    mutation InsertTodo(
        $description: String!
        $completed: Boolean!
        $userId: ID
    ) {
        newTodo: insertTodo(
            description: $description
            completed: $completed
            userId: $userId
        ) {
            id
            description
            completed
        }
    }
`

export const UPDATE_TODO = gql`
    mutation UpdateTodo($id: ID, $completed: Boolean!) {
        updatedTodo: updateTodo(id: $id, completed: $completed) {
            id
            description
            completed
        }
    }
`

export const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID) {
        deletedTodo: deleteTodo(id: $id) {
            id
        }
    }
`
