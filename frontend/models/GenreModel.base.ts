/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { BookModel, BookModelType } from "./BookModel"
import { BookModelSelector } from "./BookModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  books: IObservableArray<BookModelType>;
}

/**
 * GenreBase
 * auto generated base class for the model GenreModel.
 */
export const GenreModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Genre')
  .props({
    __typename: types.optional(types.literal("Genre"), "Genre"),
    id: types.identifier,
    name: types.union(types.undefined, types.string),
    books: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => BookModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class GenreModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  books(builder?: string | BookModelSelector | ((selector: BookModelSelector) => BookModelSelector)) { return this.__child(`books`, BookModelSelector, builder) }
}
export function selectFromGenre() {
  return new GenreModelSelector()
}

export const genreModelPrimitives = selectFromGenre().name
