const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql')

const { User } = require('../../models')
const { UserType } = require('../types')

const user = {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve(parent, { id }) {
        return User.findById(id)
    },
}

const users = {
    type: new GraphQLList(UserType),
    resolve(parent, args) {
        return User.find({})
    },
}

module.exports = {
    user,
    users
}