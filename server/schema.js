import graphql from 'graphql'
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull
} = graphql
import Todos from './models/todo.js'
import Users from './models/user.js'

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields: () => ({
        id: { type: GraphQLID },
        description: { type: new GraphQLNonNull(GraphQLString) },
        completed: { type: new GraphQLNonNull(GraphQLBoolean) },
        user: {
            type: UserType,
            resolve({ userId }, args) {
                return Users.findById(userId)
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
                return Todos.find({ userId: id })
            },
        },
    }),
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        todo: {
            type: TodoType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }) {
                return Todos.findById(id)
            },
        },
        todos: {
            type: new GraphQLList(TodoType),
            resolve(parent, args) {
                return Todos.find({})
            },
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }) {
                return Users.findById(id)
            },
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return Users.find({})
            },
        },
    },
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        insertTodo: {
            type: TodoType,
            args: {
                description: { type: new GraphQLNonNull(GraphQLString) },
                completed: { type: new GraphQLNonNull(GraphQLBoolean) },
                userId: { type: GraphQLID },
            },
            resolve(parent, { description, completed, userId}) {
                const todo = new Todos({
                    description,
                    completed,
                    userId,
                })
                return todo.save()
            },
        },
        updateTodo: {
            type: TodoType,
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
            type: TodoType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }) {
                return Todos.findByIdAndRemove(id)
            },
        },
        insertUser: {
            type: UserType,
            args: { name: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, { name }) {
                const user = new Users({
                    name,
                })
                return user.save()
            },
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, { id, name }) {
                return Users.findByIdAndUpdate(
                    id,
                    { $set: { name } },
                    { new: true },
                )
            },
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, { id }) {
                return Users.findByIdAndRemove(id)
            },
        },
    },
})

export default new GraphQLSchema({
    query: Query,
    mutation: Mutation,
})
