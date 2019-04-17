const authors = require('../models/authors');
const AUTHOR_TOPIC = 'newAuthor'; // Create a topic to subscribe
// Subsciptions
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();
// The resolvers
const resolvers = {
    Query: { 
      authors: () => authors ,
      retrieveAuthor: (obj, { id }) => authors.find(author => author.id === id)
    },
    Mutation: {
      createAuthor: (obj, args) => {
        const id = String(authors.length+1);
        const { name, age, gender} = args;
        const newAuthor = {
          id,
          info: {
            name,
            age,
            gender
          }
        }
        authors.push(newAuthor);
        pubsub.publish(AUTHOR_TOPIC, {
            createAuthorWithSubscription: newAuthor
        });
        return newAuthor;
      },
      updateAuthor: (obj, { id, name, gender, age}) => {
        const author = authors.find(author => author.id === id);
        if(author) {
          const authorIndex = authors.indexOf(author);
          if(name) author.name = name;
          if(gender) author.gender = gender;
          if(age) author.age = age;
          authors[authorIndex] = { id, info: author }; // Update author using index
          return { id, info: author };
        } else {
          throw new Error('Author ID not found');
        }
      },
      deleteAuthor: (obj, { id, name, gender, age}) => {
        const author = authors.find(author => author.id === id);
        if(author) {
          const authorIndex = authors.indexOf(author);
          authors.splice(authorIndex, 1);
          return { id, message: `Author with Id ${id} deleted successfully`, authors }
        } else {
          throw new Error('Author ID not found');
        }
      }
    },
    Subscription: {
        // Include subscription in root resolver
        createAuthorWithSubscription: {
            //Subscription operation
            subscribe: () => pubsub.asyncIterator(AUTHOR_TOPIC)
        }
    }
  };

  module.exports = resolvers;