import graphql from 'graphql'
import types from '../typeDefs.js';
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull
} = graphql
import Users from '../models/user.js';

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: types.UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }) {
                return Users.findById(id)
            },
        },
        users: {
            type: new GraphQLList(types.UserType),
            resolve(parent, args) {
                return Users.find({})
            },
        },
    },
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        insertUser: {
            type: types.UserType,
            args: { name: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, { name }) {
                const user = new Users({
                    name,
                })
                return user.save()
            },
        },
        updateUser: {
            type: types.UserType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, { id, name }) {
                return Users.findByIdAndUpdate(
                    id,
                    { $set: { name } },
                    { new: true },
                )
            },
        },
        deleteUser: {
            type: types.UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }) {
                return Users.findByIdAndRemove(id)
            },
        },
    },
})

export default {
    Mutation,
    Query
}