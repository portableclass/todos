import graphql from 'graphql'
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull
} = graphql
import TodoType from './TodoType.js.js'

const UserType = new GraphQLObjectType(
    {
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
    }
)

export default UserType