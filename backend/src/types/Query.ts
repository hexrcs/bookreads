import { idArg, queryType, stringArg } from 'nexus'
import { getUserId } from '../utils'

export const Query = queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.photon.users.findOne({
          where: {
            id: userId,
          },
        })
      },
    })

    t.field('getUser', {
      type: 'User',
      args: {
        email: stringArg({ nullable: false }),
      },
      nullable: true,
      resolve: (parent, { email }, ctx) => {
        return ctx.photon.users.findOne({
          where: { email },
        })
      },
    })

    t.list.field('search', {
      type: 'Book',
      args: {
        keywords: stringArg({ nullable: true }),
      },
      resolve: (parent, { keywords }, ctx) => {
        return ctx.photon.books.findMany({
          where: {
            OR: [
              { authors: { some: { name: { contains: keywords } } } },
              { name: { contains: keywords } },
              { description: { contains: keywords } },
            ],
          },
        })
      },
    })

    t.field('getBook', {
      type: 'Book',
      args: {
        id: idArg({ nullable: false }),
      },
      nullable: true,
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.books.findOne({
          where: { id },
        })
      },
    })

    t.list.field('listGenres', {
      type: 'Genre',
      resolve: (parent, args, ctx) => {
        return ctx.photon.genres.findMany()
      },
    })
    t.list.field('listAuthors', {
      type: 'Author',
      resolve: (parent, args, ctx) => {
        return ctx.photon.authors.findMany()
      },
    })
  },
})
