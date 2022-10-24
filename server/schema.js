import graphql from 'graphql'
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql
import Todos from './models/todo.js'
import Users from './models/user.js'

// const todosJson = [
//     { "description": "make some noise", "completed": false, "userId": "6356f791510dff80df4366fe" },
//     { "description": "listen to the silence", "completed": false, "userId": "6356f7df510dff80df4366ff" },
//     { "description": "write smth", "completed": false, "userId": "6356f84a510dff80df436700" },
//     { "description": "read smth", "completed": false, "userId": "6356f942510dff80df436701" },
// , 
// "description": "newDesc", 
// "completed": false,
// "userId": ""
// ]

// const usersJson = [
//     { "name": "John" }, 6356f791510dff80df4366fe
//     { "name": "Carl" }, 6356f7df510dff80df4366ff
//     { "name": "Donny" }, 6356f84a510dff80df436700
//     { "name": "Luk" }, 6356f942510dff80df436701
//     , "name": "newName"
// ]

// const todos = [
//     { id: '1', description: 'make some noise', completed: false, userId: '100', },
//     { id: '2', description: 'listen to the silence', completed: false, userId: '200', },
// ]

// const users = [
//     { id: '100', name: 'John' },
//     { id: '200', name: 'Carl' },
// ]

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields: () => ({
        id: { type: GraphQLID },
        description: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
        user: {
			type: UserType,
			resolve(parent, args) {
				// return directors.find(director => director.id === parent.id);
				return Users.findById(parent.userId);
			}
		}
    }),
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        todos: {
			type: new GraphQLList(TodoType),
			resolve(parent, args) {
				// return movies.filter(movie => movie.directorId === parent.id);
				return Todos.find({ userId: parent.id });
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
            resolve(parent, args) {
                // return movies.find(movie => movie.id === args.id);
                return Todos.findById(args.id);
            },
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return directors.find(director => director.id === args.id);
                return Users.findById(args.id);
            },
        },
        todos: {
            type: new GraphQLList(TodoType),
            resolve(parent, args) {
                // return movies;
                return Todos.find({})
            },
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                // return directors;
                return Users.find({})
            },
        },
    },
})

export default new GraphQLSchema({
    query: Query,
})
