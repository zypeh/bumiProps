import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from '../schemas'
import resolvers from '../resolvers'

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})
