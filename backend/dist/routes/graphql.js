"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const schemas_1 = require("../schemas");
const resolvers_1 = require("../resolvers");
exports.schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: schemas_1.default,
    resolvers: resolvers_1.default,
});
//# sourceMappingURL=graphql.js.map