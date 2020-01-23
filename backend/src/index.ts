import { ApolloServer } from 'apollo-server-micro'
import { applyMiddleware } from 'graphql-middleware'
import { IncomingMessage, ServerResponse } from 'http'
import micro from 'micro'
import cors from 'micro-cors'
import { createContext } from './context'
import { permissions } from './permissions'
import { schema } from './schema'
require('dotenv').config()

const port = process.env.PORT || 4000

const apolloServer = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: createContext,
})

const optionsHandler = (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return
  }
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res)
}
const microserver = micro(cors()(optionsHandler))
export default microserver.listen({ port, path: '/api/graphql' }, () => {
  console.log(`👉  Server: http://localhost:${port}${apolloServer.graphqlPath}`)
})
