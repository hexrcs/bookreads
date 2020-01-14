import { rule, shield } from 'graphql-shield'
import { getUserId } from '../utils'

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  // // implemented in Mutation.ts
  // isCommentOwner: rule()(async (parent, { id }, context) => {
  //   const userId = getUserId(context)
  //   const author = await context.photon.comments
  //     .findOne({
  //       where: {
  //         id,
  //       },
  //     })
  //     .author()
  //   return userId === author.id
  // }),
}

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
  },
  Mutation: {
    deleteComment: rules.isAuthenticatedUser,
    updateComment: rules.isAuthenticatedUser,
    createComment: rules.isAuthenticatedUser,
    createGenre: rules.isAuthenticatedUser,
    createAuthor: rules.isAuthenticatedUser,
    deleteBook: rules.isAuthenticatedUser,
    updateBook: rules.isAuthenticatedUser,
    createBook: rules.isAuthenticatedUser,
    upgradeToAdmin: rules.isAuthenticatedUser,
    updatePassword: rules.isAuthenticatedUser,
    updateMe: rules.isAuthenticatedUser,
  },
})
