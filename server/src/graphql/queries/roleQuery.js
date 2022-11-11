const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql')

const { Role } = require('../../models')
const { RoleType } = require('../types')

const role = {
    type: RoleType,
    args: { id: { type: GraphQLID } },
    resolve(parent, { id }) {
        return Role.findById(id)
    },
}

const roles = {
    type: new GraphQLList(RoleType),
    resolve(parent, args) {
        return Role.find({})
    },
}

module.exports = {
    role,
    roles
}