const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql'); // Fix the import statement here
const { buildSchema } = require('graphql');
const PORT = process.env.PORT || 5001;

const app = express();
app.use(bodyParser.json());

app.use(
  '/api',
  graphqlHTTP({
    // this will be single endpoint for the whole application as a REST API endpoint
    schema: buildSchema(`
      type rootQuery {
        events: [String!]
      }
      type rootMutation {
        createEvent(name: String): String
      }
      schema {
        query: rootQuery
        mutation: rootMutation
      }
    `),
    rootValue: {
      // after query(to fetch data), mutator (to update or delete data), resolvers
      events: () => {
        return ['Romantic Cooking', 'Coding', 'Dancing'];
      },
      createEvent: (args) => {
        const eventName = args.name;
        return eventName;
      },
    },
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
