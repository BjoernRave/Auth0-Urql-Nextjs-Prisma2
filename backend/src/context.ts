import { PrismaClient } from '@prisma/client'
import { ServerResponse } from 'http'
import { authenticateRequest } from './lib/utils'
const prisma = new PrismaClient()

export interface ApolloContext {
  req: any
  res: ServerResponse
}
export interface Context {
  prisma: PrismaClient
  req: any
  res: ServerResponse
  user: any
}
export async function createContext(ctx: ApolloContext) {
  const user = await authenticateRequest(ctx).catch(err =>
    console.log('error authenitcating', err),
  )

  return {
    ...ctx,
    user,
    prisma,
  }
}
