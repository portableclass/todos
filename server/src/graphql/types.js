const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql')

const { Todo, User } = require('../models')

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields: () => ({
        id: { type: GraphQLID },
        description: { type: new GraphQLNonNull(GraphQLString) },
        completed: { type: new GraphQLNonNull(GraphQLBoolean) },
        user: {
            type: UserType,
            resolve({ userId }, args) {
                return User.findById(userId)
            },
        },
    }),
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        todos: {
            type: new GraphQLList(TodoType),
            resolve({ id }, args) {
                return Todo.find({ userId: id })
            },
        },
    }),
})

module.exports = {
    UserType,
    TodoType,
}
