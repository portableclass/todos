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

const insertTodo = {
    type: TodoType,
    args: {
        description: { type: new GraphQLNonNull(GraphQLString) },
        completed: { type: new GraphQLNonNull(GraphQLBoolean) },
        userId: { type: GraphQLID },
    },
    resolve(parent, { description, completed, userId }) {
        const todo = new Todo({
            description,
            completed,
            userId,
        })
        return todo.save()
    },
}

const updateTodo = {
    type: TodoType,
    args: {
        id: { type: GraphQLID },
        completed: { type: new GraphQLNonNull(GraphQLBoolean) },
        userId: { type: GraphQLID },
    },
    resolve(parent, { id, completed, userId }) {
        return Todo.findByIdAndUpdate(
            id,
            {
                $set: {
                    completed,
                    userId,
                },
            },
            { new: true },
        )
    },
}

const deleteTodo = {
    type: TodoType,
    args: { id: { type: GraphQLID } },
    resolve(parent, { id }) {
        return Todo.findByIdAndRemove(id)
    },
}

module.exports = {
    insertTodo,
    updateTodo,
    deleteTodo
}