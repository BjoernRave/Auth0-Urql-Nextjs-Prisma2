import { ApolloServer } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'
import { IncomingMessage, ServerResponse } from 'http'
import { createContext } from './context'
import { permissions } from './permissions'
import { schema } from './schema'
require('dotenv').config()

const port = process.env.PORT || 4000

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: createContext,
})

server.listen({ port, graphqlPath: '/api/graphql' }, () =>
  console.log(`🚀 Server ready at http://localhost:4000/api/graphql`),
)
