
export default `
    scalar Date

    type User {
        name: String
        email: String
        avatar: String
        gender: String
    }

    type Query {
        me: User
        user(email: String!): User
    }

    schema {
        query: Query
    }
`