"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const language_1 = require("graphql/language");
exports.default = {
    Query: {
        me: (_, __, { curr_user }) => curr_user,
        user: async (_, { email }, { db }) => { },
    },
    // Mutation: {},
    Date: new graphql_1.GraphQLScalarType({
        name: 'Date',
        description: 'UTC number of milliseconds since midnight Jan 1 1970 as in JS date',
        parseValue(value) { return new Date(value).valueOf(); },
        serialize(value) {
            if (value instanceof Date)
                return value.valueOf();
            return value;
        },
        parseLiteral(ast) {
            if (ast.kind === language_1.Kind.INT)
                return parseInt(ast.value, 10);
            return null;
        }
    })
};
//# sourceMappingURL=index.js.map