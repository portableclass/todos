import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema.js';
import pkg from 'mongoose';
const { connect, connection } = pkg;
import * as dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = 4001;

connect(process.env.MONGODB_CONNECTION_STRING);

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
)

const dbConnection = connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Running a GraphQL API server at http://localhost:4001/graphql');
});