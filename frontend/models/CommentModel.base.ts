/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { BookModel, BookModelType } from "./BookModel"
import { BookModelSelector } from "./BookModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  book: BookModelType;
  user: UserModelType;
}

/**
 * CommentBase
 * auto generated base class for the model CommentModel.
 */
export const CommentModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Comment')
  .props({
    __typename: types.optional(types.literal("Comment"), "Comment"),
    id: types.identifier,
    content: types.union(types.undefined, types.string),
    book: types.union(types.undefined, MSTGQLRef(types.late((): any => BookModel))),
    user: types.union(types.undefined, MSTGQLRef(types.late((): any => UserModel))),
    rating: types.union(types.undefined, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class CommentModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get content() { return this.__attr(`content`) }
  get rating() { return this.__attr(`rating`) }
  book(builder?: string | BookModelSelector | ((selector: BookModelSelector) => BookModelSelector)) { return this.__child(`book`, BookModelSelector, builder) }
  user(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`user`, UserModelSelector, builder) }
}
export function selectFromComment() {
  return new CommentModelSelector()
}

export const commentModelPrimitives = selectFromComment().content.rating
