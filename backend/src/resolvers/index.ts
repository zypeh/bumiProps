
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export default {
    Query: {
        me: (_, __, { curr_user }) => curr_user,
        user: async (_, { email }, { db }) => {}, // await db.User.findOne({ where: { email }}),
    },
    // Mutation: {},
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'UTC number of milliseconds since midnight Jan 1 1970 as in JS date',
        parseValue(value) { return new Date(value).valueOf() },
        serialize(value) {
            if (value instanceof Date) return value.valueOf()
            return value
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) return parseInt(ast.value, 10)
            return null
        }
    })
}