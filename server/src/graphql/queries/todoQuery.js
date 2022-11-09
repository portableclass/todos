const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql')

const { Todo } = require('../../models')
const { TodoType } = require('../types')

const todo = {
    type: TodoType,
    args: { id: { type: GraphQLID } },
    resolve(parent, { id }) {
        return Todo.findById(id)
    },
}

const todos = {
    type: new GraphQLList(TodoType),
    resolve(parent, args) {
        return Todo.find({})
    },
}

module.exports = {
    todo,
    todos
}