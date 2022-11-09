const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require('cors')
const { graphqlHTTP } = require("express-graphql")
const schema = require("./graphql/schema")

dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()

// Configure database
mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
)
mongoose.connection.on(
    'error',
    err => console.log(`Connection error: ${err}`)
)
mongoose.connection.once(
    'open',
    () => console.log('Connected to MongoDB!')
)

app.use(cors())
app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    }),
)

// Start server listening
app.listen(PORT, err => {
    err
        ? console.log(err)
		: console.log(
			`Running a GraphQL API server at http://localhost:${PORT}/graphql`,
        )
})