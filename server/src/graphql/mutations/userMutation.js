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

const insertUser = {
    type: UserType,
    args: { name: { type: new GraphQLNonNull(GraphQLString) } },
    resolve(parent, { name }) {
        const user = new User({
            name,
        })
        return user.save()
    },
}

const updateUser = {
    type: UserType,
    args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, { id, name }) {
        return User.findByIdAndUpdate(id, { $set: { name } }, { new: true })
    },
}

const deleteUser = {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve(parent, { id }) {
        return User.findByIdAndRemove(id)
    },
}

module.exports = {
    insertUser,
    updateUser,
    deleteUser,
}
