import graphql from 'graphql'
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull
} = graphql
import UserType from './userType.js'

const TodoType = new GraphQLObjectType(
    {
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
    },
)

export default TodoType