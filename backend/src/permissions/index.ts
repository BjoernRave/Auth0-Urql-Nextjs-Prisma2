import { rule, shield } from 'graphql-shield'

const rules = {
  isAuthenticatedUser: rule()((parent, args, ctx) => {
    return ctx.user.permissions.includes('user')
  }),
}

export const permissions = shield({
  Query: {
    post: rules.isAuthenticatedUser,
    posts: rules.isAuthenticatedUser,
  },
  Mutation: {
    createOnePost: rules.isAuthenticatedUser,
    updateOnePost: rules.isAuthenticatedUser,
    deleteOnePost: rules.isAuthenticatedUser,
  },
})
