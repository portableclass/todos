import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import { buildSchema } from 'graphql'
import { readFileSync } from 'fs'

const schemaString = readFileSync('schema.graphql', { encoding: 'utf8' })
const schema = buildSchema(schemaString)

const todos = [
    {
        id: '1',
        description: 'make some noise',
        completed: false,
        userId: '100',
    },
    {
        id: '2',
        description: 'listen to the silence',
        completed: false,
        userId: '200',
    },
]

const users = [
    { id: '100', name: 'John' },
    { id: '200', name: 'Carl' },
]


const root = {
    Todo: params => {
        if (!todos.find(({ id }) => id === params.id))
            throw new Error('no todo exists with id: ' + params.id)

        return todos.find(({ id }) => id === params.id)
    },
    allTodos: () => {
        return todos
    },
    createTodo: params => {
        const newId = '' + (todos.length + 1)
        todos.push({
            id: newId,
            ...params.todo,
        })

        console.log(todos)

        return todos.find(({ id }) => id === newId)
    },
    updateTodo: params => {        
        return todos
            .map(todo => {
                console.log(todo.id, params.id)
                if (todo.id !== params.id) return todo

                return {
                    ...todo,
                    ...params,
                }
            })
            .find(({ id }) => id === params.id)
    },
    deleteTodo: params => {
        todos
            .filter(todo => todo.id !== params.id)
            .find(({ id }) => id === params.id)

        return params.id
    },
    User: params => {
        if (!users.find(({ id }) => id === params.id))
            throw new Error('no user exists with id: ' + params.id)

        return users.find(({ id }) => id === params.id)
    },
    allUsers: () => {
        return users
    },
}

const app = express()

app.use(cors())

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }),
)

app.listen(4000)

// eslint-disable-next-line no-console
console.log('Running a GraphQL API server at http://localhost:4000/graphql')
