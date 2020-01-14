import { objectType } from 'nexus'

export const Genre = objectType({
  name: 'Genre',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.books()
  },
})
