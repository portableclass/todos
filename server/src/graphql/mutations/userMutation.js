const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType,
} = require('graphql')
const mongoose = require('mongoose')
const { User, Role } = require('../../models')
const { UserType, RoleType, RoleInput } = require('../types')

const insertUser = {
    type: UserType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        roles: {
            type: new GraphQLNonNull(new GraphQLList(RoleInput)),
        },
    },
    async resolve(parent, { username, password, roles }) {
        const temp = roles.map(role => {
            return { value: role.value }
        })

        const docs = await Role.aggregate([{ $match: { $or: temp } }])

        const ids = docs.map(item => {
            const value = item._id.toString()
            return {
                ...item,
                _id: `${value}`,
            }
        })

        const user = new User({
            username,
            password,
            roles: ids,
        })

        return await user.save()
    },
}

// const updateUser = {
//     type: UserType,
//     args: {
//         id: { type: GraphQLID },
//         name: { type: new GraphQLNonNull(GraphQLString) },
//     },
//     async resolve(parent, { id, name }) {
//         // return User.findByIdAndUpdate(id, { $set: { name } }, { new: true })
//         try {

//         } catch (e) {

//         }
//     },
// }

const deleteUser = {
    type: UserType,
    args: { id: { type: GraphQLID } },
    async resolve(parent, { id }) {
        // return User.findByIdAndRemove(id)
        try {
            return await User.findByIdAndRemove(id)
        } catch (e) {
            throw new Error('deleteUser error: userMutation.js')
        }
    },
}

const deleteAllUsers = {
    type: GraphQLString,
    args: {},
    async resolve(parent, args) {
        try {
            await User.deleteMany({})
            return 'success'
        } catch (e) {
            throw new Error('deleteAllUsers error: userMutation.js')
        }
    },
}

module.exports = {
    insertUser,
    // updateUser,
    deleteUser,
    deleteAllUsers,
}
