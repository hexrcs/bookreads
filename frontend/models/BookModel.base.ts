/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { AuthorModel, AuthorModelType } from "./AuthorModel"
import { AuthorModelSelector } from "./AuthorModel.base"
import { CommentModel, CommentModelType } from "./CommentModel"
import { CommentModelSelector } from "./CommentModel.base"
import { GenreModel, GenreModelType } from "./GenreModel"
import { GenreModelSelector } from "./GenreModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  genres: IObservableArray<GenreModelType>;
  authors: IObservableArray<AuthorModelType>;
  comments: IObservableArray<CommentModelType>;
}

/**
 * BookBase
 * auto generated base class for the model BookModel.
 */
export const BookModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Book')
  .props({
    __typename: types.optional(types.literal("Book"), "Book"),
    id: types.identifier,
    name: types.union(types.undefined, types.string),
    genres: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => GenreModel)))),
    authors: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => AuthorModel)))),
    coverUrl: types.union(types.undefined, types.null, types.string),
    description: types.union(types.undefined, types.null, types.string),
    isbn: types.union(types.undefined, types.null, types.string),
    comments: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => CommentModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class BookModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get coverUrl() { return this.__attr(`coverUrl`) }
  get description() { return this.__attr(`description`) }
  get isbn() { return this.__attr(`isbn`) }
  genres(builder?: string | GenreModelSelector | ((selector: GenreModelSelector) => GenreModelSelector)) { return this.__child(`genres`, GenreModelSelector, builder) }
  authors(builder?: string | AuthorModelSelector | ((selector: AuthorModelSelector) => AuthorModelSelector)) { return this.__child(`authors`, AuthorModelSelector, builder) }
  comments(builder?: string | CommentModelSelector | ((selector: CommentModelSelector) => CommentModelSelector)) { return this.__child(`comments`, CommentModelSelector, builder) }
}
export function selectFromBook() {
  return new BookModelSelector()
}

export const bookModelPrimitives = selectFromBook().name.coverUrl.description.isbn
