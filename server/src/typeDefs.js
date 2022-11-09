import graphql from 'graphql'
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull
} = graphql

const TodoType = new GraphQLObjectType(
    // this.UserType = UserType,
    {
        name: 'Todo',
        fields: () => ({
            id: { type: GraphQLID },
            description: { type: new GraphQLNonNull(GraphQLString) },
            completed: { type: new GraphQLNonNull(GraphQLBoolean) },
            user: {
                type: this.UserType = UserType,
                resolve({ userId }, args) {
                    return Users.findById(userId)
                },
            },
        }),
    }
)

const UserType = new GraphQLObjectType(
    {
        name: 'User',
        fields: () => ({
            id: { type: GraphQLID },
            name: { type: new GraphQLNonNull(GraphQLString) },
            todos: {
                type: new GraphQLList(this.TodoType = TodoType),
                resolve({ id }, args) {
                    return Todos.find({ userId: id })
                },
            },
        }),
    }
)

export default {
    UserType,
    TodoType
}