var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const schema = buildSchema(`
type Query { 
    hello: String 
}`);
const rootResolver = { hello: () => 'Hello world!' };
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootResolver,
  graphiql: true,
}));
app.listen(1200, () => console.log('Now browse to localhost:1200/graphql'));
