import { Photon } from '@prisma/photon'
import { ServerResponse } from 'http'
import { authenticateRequest } from './lib/utils'
import passport = require('passport')
const photon = new Photon()

export interface MicroContext {
  req: any
  res: ServerResponse
}
export interface Context {
  photon: Photon
  req: any
  res: ServerResponse
  user: any
}
export async function createContext(ctx: MicroContext) {
  const user = await authenticateRequest(ctx.req).catch(err =>
    console.log('error authenitcating', err),
  )

  return {
    ...ctx,
    user,
    photon,
  }
}
