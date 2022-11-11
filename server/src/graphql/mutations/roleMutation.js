const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
    GraphQLError,
} = require('graphql')

const { Role } = require('../../models')
const { RoleType } = require('../types')

const insertRole = {
    type: RoleType,
    args: {
        value: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, { value }) {
        try {
            const role = new Role({ value })
            return await role.save()
        } catch (e) {
            console.log(e)
            throw new Error('insertRole error: roleMutation.js')
        }
    },
}

const deleteRole = {
    type: RoleType,
    args: { id: { type: GraphQLID } },
    async resolve(parent, { id }) {
        try {
            if (id === null) {
                throw new Error('id cant be null')
            }
            return await Role.findByIdAndRemove(id)
        } catch (e) {
            console.log(e)
            throw new Error('deleteRole error: roleMutation.js')
        }
    },
}

module.exports = {
    insertRole,
    deleteRole,
}
