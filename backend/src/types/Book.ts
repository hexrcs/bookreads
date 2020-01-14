import { objectType } from 'nexus'

export const Book = objectType({
  name: 'Book',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.genres()
    t.model.authors()
    t.model.coverUrl()
    t.model.description()
    t.model.isbn()
    t.model.comments()
    // t.model.commentsCount()
  },
})
