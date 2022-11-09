const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const queries = require('./queries')
const mutations = require('./mutations')

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: queries,
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations,
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
})
