const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('../resolvers/authors');
/*
GraphQL schema
Represents the type of data(the input and output) and operations that can be performed on that data.
Type Query represents the root query; the entry point for all graphql queries.
*/
// The GraphQL schema in string form
const typeDefs = `
type Author {
	id: ID!
	info: Person
}
type Person {
	name: String!
	age: Int
	gender: String
}
type Query {
  authors: [Author]
  retrieveAuthor(id: ID!): Author
}
type DeleteMessage {
  id: ID!,
  message: String,
  authors: [Author]
}
type Mutation {
  createAuthor(name: String!, age: Int!, gender: String!) : Author
  updateAuthor(id: ID!, name: String, gender: String, age: Int): Author
  deleteAuthor(id:ID!): DeleteMessage
}
type Subscription {
    createAuthorWithSubscription: Author
}
`;

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports = schema;