import { Photon } from '@prisma/photon'
import { ServerResponse } from 'http'
import { authenticateRequest } from './lib/utils'
const photon = new Photon()

export interface ApolloContext {
  req: any
  res: ServerResponse
}
export interface Context {
  photon: Photon
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
    photon,
  }
}
