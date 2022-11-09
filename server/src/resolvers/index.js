import todoResolver from './todoResolver.js';
import userResolver from './userResolver.js';

export default {
    Query: {
        ...todoResolver.Query,
        ...userResolver.Query
    },
    Mutation: {
        ...todoResolver.Mutation,
        ...userResolver.Mutation
    },
};