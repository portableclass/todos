import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import schema from './schema.js'

import graphql from 'graphql'
const {
    GraphQLSchema
} = graphql
import resolvers from './resolvers/index.js';
const schema2 = new GraphQLSchema({
    query: resolvers.Query,
    mutation: resolvers.Mutation,
})

import pkg from 'mongoose'
const { connect, connection } = pkg
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = 4000

connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true })

const dbConnection = connection
dbConnection.on('error', err => console.log(`Connection error: ${err}`))
dbConnection.once('open', () => console.log('Connected to DB!'))

app.use(cors())

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    }),
)

app.listen(PORT, err => {
    err
        ? console.log(err)
		: console.log(
			'Running a GraphQL API server at http://localhost:4000/graphql',
        )
})