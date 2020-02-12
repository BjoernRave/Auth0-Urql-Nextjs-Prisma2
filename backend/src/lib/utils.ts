import { verify, VerifyOptions } from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import { ApolloContext } from '../context'

export const authenticateRequest = (ctx: ApolloContext) => {
  const options: VerifyOptions = {
    audience: process.env.AUTH0_API_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256'],
  }

  const getKey = (header, callback) => {
    const client = jwksClient({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    })

    client.getSigningKey(header.kid, (err, key: jwksClient.SigningKey) => {
      if (err) console.log(err)

      try {
        callback(null, key.getPublicKey())
      } catch (err) {
        console.log(err)

        callback(err)
      }
    })
  }

  const token =
    ctx && ctx.req && ctx.req.headers && ctx.req.headers.authorization
      ? ctx.req.headers.authorization.replace('Bearer ', '')
      : ''

  return new Promise((resolve, reject) => {
    verify(token, getKey, options, (err, decoded) => {
      if (err) {
        console.log('verify err', err)

        return reject(err)
      }

      resolve(decoded)
    })
  })
}
