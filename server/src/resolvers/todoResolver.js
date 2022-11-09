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
import Todos from '../models/todo.js';
// const TodoType = types.TodoType;

const Query = new GraphQLObjectType(
    // this.TodoType = types.TodoType,
    {
    name: 'Query',
    fields: {
        todo: {
            type: types.TodoType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }) {
                return Todos.findById(id)
            },
        },
        todos: {
            type: new GraphQLList(types.TodoType),
            resolve(parent, args) {
                return Todos.find({})
            },
        },
    },
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        insertTodo: {
            type: types.TodoType,
            args: {
                description: { type: new GraphQLNonNull(GraphQLString) },
                completed: { type: new GraphQLNonNull(GraphQLBoolean) },
                userId: { type: GraphQLID },
            },
            resolve(parent, { description, completed, userId }) {
                const todo = new Todos({
                    description,
                    completed,
                    userId,
                })
                return todo.save()
            },
        },
        updateTodo: {
            type: types.TodoType,
            args: {
                id: { type: GraphQLID },
                completed: { type: new GraphQLNonNull(GraphQLBoolean) },
                userId: { type: GraphQLID },
            },
            resolve(parent, { id, completed, userId }) {
                return Todos.findByIdAndUpdate(
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
        },
        deleteTodo: {
            type: types.TodoType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }) {
                return Todos.findByIdAndRemove(id)
            },
        },
    }
})

export default {
    Mutation,
    Query
}
