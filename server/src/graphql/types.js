const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType,
} = require('graphql')

const { User, Role } = require('../models')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        roles: {
            type: new GraphQLList(RoleType),
            resolve(parent, args) {
                return parent.roles.map(role => Role.findById(role))
            },
        },
    }),
})

const RoleType = new GraphQLObjectType({
    name: 'Role',
    fields: () => ({
        id: { type: GraphQLID },
        value: { type: new GraphQLNonNull(GraphQLString) },
    }),
})

const RoleInput = new GraphQLInputObjectType({
    name: 'RoleInput',
    fields: () => ({
        value: {
            type: new GraphQLNonNull(GraphQLString),
        },
    }),
})

module.exports = {
    UserType,
    RoleType,
    RoleInput,
}
