import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { idArg, mutationType, stringArg, intArg } from 'nexus'
import { APP_SECRET, getUserId } from '../utils'

export const Mutation = mutationType({
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg({ nullable: false }),
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.photon.users.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        })
        console.log(user)
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, context) => {
        const user = await context.photon.users.findOne({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('updateMe', {
      type: 'User',
      args: {
        name: stringArg(),
        bio: stringArg(),
      },
      resolve: (parent, { name, bio }, ctx) => {
        const userId = getUserId(ctx)
        return ctx.photon.users.update({
          where: { id: userId },
          data: {
            bio,
            name,
          },
        })
      },
    })

    t.field('updatePassword', {
      type: 'User',
      args: {
        password: stringArg({ nullable: false }),
      },
      resolve: async (parent, { password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const userId = getUserId(ctx)
        return ctx.photon.users.update({
          where: { id: userId },
          data: {
            password: hashedPassword,
          },
        })
      },
    })

    t.field('upgradeToAdmin', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.photon.users.update({
          where: { id: userId },
          data: { userRole: 'ADMIN' },
        })
      },
    })

    // Book stuff
    t.field('createBook', {
      type: 'Book',
      args: {
        name: stringArg({ nullable: false }),
        coverUrl: stringArg(),
        description: stringArg(),
        genres: idArg({ list: true }), // selection done on frontend
        authors: idArg({ list: true }),
        isbn: stringArg(),
      },
      resolve: async (
        parent,
        { name, coverUrl, description, genres, authors, isbn },
        ctx,
      ) => {
        const userId = getUserId(ctx)
        const me = await ctx.photon.users.findOne({ where: { id: userId } })
        if (me?.userRole !== 'ADMIN') {
          throw new Error('You are not an admin!')
        }

        return await ctx.photon.books.create({
          data: {
            name,
            coverUrl,
            description,
            isbn,
            genres: { connect: genres?.map((x: string) => ({ id: x })) },
            authors: { connect: authors?.map((x: string) => ({ id: x })) },
          },
        })
      },
    })

    t.field('updateBook', {
      type: 'Book',
      args: {
        id: idArg({ nullable: false }),
        name: stringArg(),
        coverUrl: stringArg(),
        description: stringArg(),
        genres: idArg({ list: true }), // selection done on frontend
        authors: idArg({ list: true }),
        isbn: stringArg(),
      },
      resolve: async (
        parent,
        { name, coverUrl, description, genres, authors, id, isbn },
        ctx,
      ) => {
        const userId = getUserId(ctx)
        const me = await ctx.photon.users.findOne({ where: { id: userId } })
        if (me?.userRole !== 'ADMIN') {
          throw new Error('You are not an admin!')
        }

        return await ctx.photon.books.update({
          where: { id },
          data: {
            name,
            coverUrl,
            description,
            isbn,
            genres: { connect: genres?.map((x: string) => ({ id: x })) },
            authors: { connect: authors?.map((x: string) => ({ id: x })) },
          },
        })
      },
    })

    t.field('deleteBook', {
      type: 'Book',
      args: {
        id: idArg({ nullable: false }),
      },
      resolve: async (parent, { id }, ctx) => {
        const userId = getUserId(ctx)
        const me = await ctx.photon.users.findOne({ where: { id: userId } })
        if (me?.userRole !== 'ADMIN') {
          throw new Error('You are not an admin!')
        }

        return await ctx.photon.books.delete({ where: { id } })
      },
    })

    // Author stuff
    t.field('createAuthor', {
      type: 'Author',
      args: {
        name: stringArg({ nullable: false }),
      },
      resolve: async (parent, { name }, ctx) => {
        const userId = getUserId(ctx)
        const me = await ctx.photon.users.findOne({ where: { id: userId } })
        if (me?.userRole !== 'ADMIN') {
          throw new Error('You are not an admin!')
        }
        const author = await ctx.photon.authors.findOne({ where: { name } })
        if (author) return author

        return await ctx.photon.authors.create({ data: { name } })
      },
    })

    // Genre stuff
    t.field('createGenre', {
      type: 'Genre',
      args: {
        name: stringArg({ nullable: false }),
      },
      resolve: async (parent, { name }, ctx) => {
        const userId = getUserId(ctx)
        const me = await ctx.photon.users.findOne({ where: { id: userId } })
        if (me?.userRole !== 'ADMIN') {
          throw new Error('You are not an admin!')
        }
        const genre = await ctx.photon.genres.findOne({ where: { name } })
        if (genre) return genre

        return await ctx.photon.genres.create({ data: { name } })
      },
    })

    // Comment stuff
    t.field('createComment', {
      type: 'Comment',
      args: {
        content: stringArg({ nullable: false }),
        bookId: idArg({ nullable: false }),
        rating: intArg({ nullable: false }),
      },
      // resolve: async (parent, { content, bookId, rating }, ctx) => {
      //   const userId = getUserId(ctx)

      //   // // didn't find any docs on transactions
      //   // // found this => https://github.com/prisma/photonjs/issues/349
      //   const newComment = await ctx.photon.comments.create({
      //     data: {
      //       content,
      //       rating,
      //       book: { connect: { id: bookId } },
      //       user: { connect: { id: userId } },
      //     },
      //     select: {
      //       book: true,
      //       user: true,
      //       rating: true,
      //       id: true,
      //     },
      //   })
      //   const prevBook = await ctx.photon.books.findOne({
      //     where: {
      //       id: newComment.book.id,
      //     },
      //     select: {
      //       comments: true,
      //       rating: true,
      //       commentsCount: true,
      //     },
      //   })

      //   const updatedBook = await ctx.photon.books.update({
      //     where: {
      //       id: newComment.book.id,
      //     },
      //     data: {
      //       rating:
      //         ((prevBook?.rating ?? 0) * (prevBook?.comments.length ?? 0) +
      //           newComment.rating) /
      //         (prevBook?.comments.length ?? 0 + 1),
      //       commentsCount: (prevBook?.commentsCount ?? 0) + 1,
      //     },
      //   })

      //   const prevUser = await ctx.photon.users.findOne({
      //     where: {
      //       id: newComment.user.id,
      //     },
      //   })
      //   const updatedUser = await ctx.photon.users.update({
      //     where: {
      //       id: newComment.user.id,
      //     },
      //     data: {
      //       commentsCount: (prevUser?.commentsCount ?? 0) + 1,
      //     },
      //   })

      //   return await ctx.photon.comments.findOne({
      //     // typing error with findOne
      //     where: {
      //       id: newComment.id,
      //     },
      //   })
      // },
      resolve: async (parent, { content, bookId, rating }, ctx) => {
        const userId = getUserId(ctx)

        return await ctx.photon.comments.create({
          data: {
            content,
            rating,
            book: { connect: { id: bookId } },
            user: { connect: { id: userId } },
          },
        })
      },
    })

    t.field('updateComment', {
      type: 'Comment',
      args: {
        id: idArg({ nullable: false }),
        content: stringArg(),
        rating: intArg(),
      },
      resolve: async (parent, { content, rating, id }, ctx) => {
        const userId = getUserId(ctx)
        const comment = await ctx.photon.comments.findOne({
          where: { id },
          select: { user: true },
        })
        if (comment?.user.id !== userId) {
          throw new Error("Cannot update other's comments!")
        }

        return await ctx.photon.comments.update({
          where: { id },
          data: { content, rating },
        })
      },
    })

    t.field('deleteComment', {
      type: 'Comment',
      args: {
        id: idArg({ nullable: false }),
      },
      resolve: async (parent, { id }, ctx) => {
        const userId = getUserId(ctx)
        const comment = await ctx.photon.comments.findOne({
          where: { id },
          select: { user: true },
        })
        if (comment?.user.id !== userId) {
          throw new Error("Cannot update other's comments!")
        }

        return await ctx.photon.comments.delete({ where: { id } })
      },
    })
  },
})
